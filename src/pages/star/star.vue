<template>
  <view class="page">
    <view class="container">
      <view class="current item">
        <icon-awesome-component-vue class="icon" icon="fa-map-marker" size="20px"/>
        <view class="title">
          {{starCities[0].district}}-{{starCities[0].street}}
        </view>
        <view class="subtitle">您当前位置</view>
      </view>
      <view v-for="(item,index) in starCities" v-bind:key="index">
        <div class="item" v-if="index > 0">
          <icon-awesome-component-vue class="icon" icon="fa-ellipsis-v" size="6vw"/>
          <view class="title">
            {{item.province !== item.city? item.province + "-":""}}
            {{item.city !== item.district? item.city + "-":""}}
            {{item.district}}
          </view>
          <div @click="DeleteThis(index, item)">
            <icon-awesome-component-vue class="icon"
                                        icon="fa-trash-o"
                                        size="6vw"/>
          </div>
        </div>
      </view>
    </view>
  </view>
</template>
<script lang="ts">
import Vue from 'vue';
import IconAwesomeComponentVue from '../../components/IconAwesome/IconAwesome.component.vue';
import {StorageService} from '@/core/service/storage.service';
import Component from 'vue-class-component';
import {realTimeWeatherStorage, starCitiesStorage, weekWeatherStorage} from '@/core/config/storage/storage.config';
import {switchMap} from 'rxjs/operators';
@Component({components: {
  IconAwesomeComponentVue,
}})
export default class Star extends Vue {
  private starCities: Array<any> = [];
  public onLoad() {
    new StorageService(starCitiesStorage).get().subscribe((res) => {
      this.starCities = res.data;
    });
  }
  private DeleteThis(index: number, item: any) {
    console.log(index);
    console.log(item);
    let title = '';
    item.province != item.city? title = title + item.province + '-': '';
    item.city != item.district? title = title + item.city + '-' : '';
    title = title + item.district;
    const storageService = new StorageService(starCitiesStorage);
    storageService.get().subscribe((res) => {
      res.data.splice(index, 1);
      this.starCities = res.data;
      if (storageService.storage) {
        storageService.storage.value = res;
      }
      storageService.set().pipe(
          switchMap(() => new StorageService(realTimeWeatherStorage(item.id)).remove()),
          switchMap(() => new StorageService(weekWeatherStorage(item.id)).remove()),
      ).subscribe((res)=>{
        uni.showToast({
          icon: 'none',
          title: title + '已从收藏城市列表中删除',
        });
      });
    });
  }
}
</script>
<style lang="stylus" scoped>
.item
  width 100%
  height 100vw
  display flex
  align-items center
  justify-content space-between
  height 15vw
  padding-left 3vw
  padding-right 3vw
  .icon
    width 15vw
    height 15vw
  .title
    flex 1
    font-size 1rem
    font-weight bold
  .subtitle
    font-size 0.9rem
    font-weight 500
.current
  border-bottom 1vw solid rgba(0,0,0,0.1)
</style>
