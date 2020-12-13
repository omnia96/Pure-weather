<template>
  <view class="page">
    <view class="container">
      <view class="search">
        <input type="text" @input="SetIndex" v-model="text">
        <icon-awesome-component-vue class="icon" icon="fa-search" size="5vw" color="#333333" @tap="but"/>
      </view>
      <div class="drop-down">
        <scroll-view class="index animation-expan-vertical" scroll-y="true" v-if="Index.length != null">
          <view
              class="animation-slide-left"
              v-for="(item,index) in Index"
              :key="index"
              :data-value="item"
              :style="'animation-delay: ' + (index+1)*0.2 + 's'"
              @tap="SelectCity">{{item.provinceZh != item.leaderZh? item.provinceZh + '-':''}}{{item.leaderZh != item.cityZh? item.leaderZh + '-':''}}{{item.cityZh}}</view>
        </scroll-view>
      </div>
      <view class="history card">
        <view class="card-title">
          <view>历史记录</view>
          <div class="delete" @click="clearHistory">
            <icon-awesome-component-vue class="icon" icon="fa-trash-o" size="32upx" />
          </div>
        </view>
        <view class="card-content">
          <view
              class="animation-slide-left"
              v-for="(item,index) in SearchHistory"
              :key="index"
              :style="'animation-delay: ' + (index+1)*0.2 + 's'"
              @click="addThis(item)">{{item.cityZh}}</view>
        </view>
      </view>
      <view class="popular card">
        <view class="card-title">热门城市</view>
        <view class="card-content">
          <div
              class="animation-slide-left"
              v-for="(item,index) in popularCities"
              :key="index"
              :style="'animation-delay: ' + (index+1)*0.2 + 's'"
              @click="addThis(item)">{{item.leaderZh}}</div>
        </view>
      </view>
    </view>
  </view>
</template>
<script lang="ts">
import Vue from 'vue';
import IconAwesomeComponentVue from '../../components/IconAwesome/IconAwesome.component.vue';
import {systemInfoService} from '../../core/service/service.module';
import {CityData} from '../../core/libs/cityData';
import {StorageService} from '../../core/service/storage/storage.service';
import {storages} from '../../core/config/config.module';
import Component from 'vue-class-component';
@Component({components: {
  IconAwesomeComponentVue,
}})
export default class Search extends Vue {
  private popularCities: Array<{id: string, provinceZh: string, leaderZh: string, cityZh: string}> = [];
  private text = '';
  private index: any = {};
  private SearchHistory: any;
  private statusBarHeight = systemInfoService.systemInfo.statusBarHeight
  public onLoad() {
    const storageService = new StorageService(storages.searchHistory);
    console.log();
    storageService.get().then((res) => {
      this.SearchHistory = res;
    }).catch((err) => {
      storageService.set();
    });
  }
  public onReady() {
    this.popularCities = [
      {id: '101010100', provinceZh: '北京', leaderZh: '北京', cityZh: '北京'},
      {id: '101020100', provinceZh: '上海', leaderZh: '上海', cityZh: '上海'},
      {id: '101280101', provinceZh: '广东', leaderZh: '广州', cityZh: '广州'},
      {id: '101280601', provinceZh: '广东', leaderZh: '深圳', cityZh: '深圳'},
      {id: '101180101', provinceZh: '河南', leaderZh: '郑州', cityZh: '郑州'},
      {id: '101110101', provinceZh: '陕西', leaderZh: '西安', cityZh: '西安'},
      {id: '101190101', provinceZh: '江苏', leaderZh: '南京', cityZh: '南京'},
      {id: '101210101', provinceZh: '浙江', leaderZh: '杭州', cityZh: '杭州'},
      {id: '101200101', provinceZh: '湖北', leaderZh: '武汉', cityZh: '武汉'},
      {id: '101270101', provinceZh: '四川', leaderZh: '成都', cityZh: '成都'},
      {id: '101070101', provinceZh: '辽宁', leaderZh: '沈阳', cityZh: '沈阳'},
      {id: '101030100', provinceZh: '天津', leaderZh: '天津', cityZh: '天津'},
    ];
  }
  private but() {
    console.log(this.text);
    const Index = [];
    Index.push(this.text);
    this.Index = Index;
  }
  private SetIndex(e:any) {
    console.log(e);
    const value = e.detail.value;
    const Index = [];
    if (value.length > 0) {
      const CityList = new CityData().citys;
      for (const key in CityList) {
        CityList[key]['provinceZh'].indexOf(value) != -1 || CityList[key]['leaderZh'].indexOf(value) != -1 || CityList[key]['cityZh'].indexOf(value) != -1? Index.push(CityList[key]):'';
      }
      this.Index = Index;
    } else {
      this.Index = {};
    }
  }
  private SelectCity(e:any) {
    const value = e.currentTarget.dataset.value;
    const storageService = new StorageService(storages.searchHistory);
    storageService.get().then((res) => {
      res.push(value);
      res.length > 4 ? res.splice(0, 1) : '';
      this.SearchHistory = res;
      this.AddToStar(value);
      if (storageService.storage) {
        storageService.storage.value = res;
      }
      storageService.set();
    });
  }
  private addThis(city: {id: string, provinceZh: string, leaderZh: string, cityZh: string}) {
    this.AddToStar(city);
  }
  private AddToStar(value:any) {
    const StarCityList = [];
    const city = {
      citycode: value.id,
      cityname: {
        icon: false,
        province: value.provinceZh,
        leader: value.leaderZh,
        city: value.cityZh,
      },
    };
    const storageService = new StorageService(storages.starCityList);
    storageService.get().then((res) => {
      res.push(city);
      if (res.length >= 5) {
        res.splice(1, 1);
      }
      if (storageService.storage) {
        storageService.storage.value = res;
      }
      storageService.set().then((res) => {
        this.Index = {};
        uni.navigateBack({
          delta: 1,
        });
      });
    });
  }
  private clearHistory() {
    new StorageService(storages.searchHistory).set().then((res) => {
      this.SearchHistory = null;
    });
  }
}
</script>
<style lang="stylus" scoped>
.search
  width 94%
  height 12vw
  margin 10upx auto
  background #FFFFFF
  display flex
  align-items center
  justify-content center
  background rgba(0,0,0,.04)
  input
    flex 1
    height 12vw
    line-height 10vw
    font-size 1rem
    margin 0 20upx
  .icon
    width 12vw
    height 12vw
.search:hover
  box-shadow 0 2upx 4upx rgba(0,0,0,0.16),0 2upx 4upx rgba(0,0,0,0.23)
.drop-down
  width 94%
  margin 0 auto
  position relative
  .index
    width 100%
    margin 0 auto
    height 50vh
    box-shadow 0 2px 4px rgba(0,0,0,0.16),0 2px 4px rgba(0,0,0,0.23)
    position absolute
    background rgba(255,255,255,0.95)
    z-index 1
    view
      width 96vw
      height 10vw
      padding-left 2vw
      padding-right 2vw
      font-size 0.9rem
      display flex
      align-items center
      justify-content flex-start
    view:active
      background #2196f3

.card
  width 100vw
  height auto
  display flex
  flex-direction column
  align-items center
  .card-title
    width 96vw
    height 80upx
    display flex
    align-items center
    justify-content space-between
    font-size 1rem
    font-weight bold
    .icon
      width 80upx
      height 80upx
  .card-content
    width 96vw
    height auto
    display flex
    flex-wrap wrap
    align-items flex-start
    justify-content flex-start
    view
      width 22vw
      margin 1vw
      height 10vw
      display flex
      align-items center
      justify-content center
      font-size 0.9rem
      font-weight 500
    view:hover
      background rgba(0,0,0,0.1)
.history
  .card-title
    .delete
      width 80upx
      height 80upx
</style>
