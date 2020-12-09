<template>
  <div class="page">
    <div class="status-bar" :style="'height:' + StatusBarHeight + 'px;'"></div>
    <div class="container">
      <view class="header" :style="'margin-top:calc(90rpx + '+StatusBarHeight+'px);'">
        <view class="icon">
          <icon-freecns-component-vue icon="Cumulus-Cloud" color="#2196f3" size="20px"/>
        </view>
        <view class="name">Pure · 简天气</view>
        <view class="current">首页</view>
      </view>
      <swiper :style="'width:100%;height:calc(100vh - 85px - ' + StatusBarHeight + 'px);'"
              :current="MainSwiper"
              @animationfinish="MainSwiperChange">
        <swiper-item v-for="(value,key) in StarCityList" v-bind:key="key">
          <scroll-view scroll-y style="width: 100%; height: 100%;">
            <view style="width: 100%;height: 100%;display: flex;flex-direction: column;align-items: center;">
              <view class="card">
                <view class="header">
                  <view>今日天气</view>
                  <view class="address">
                    <view class="left" v-if="Address.icon == true">
                      <icon-awesome-component-vue icon="fa-map-marker"/>
                    </view>
                    <view class="right" v-if="Address.icon == true">{{ Address.district }}·{{ Address.street }}</view>
                    <view class="right" v-if="Address.icon == false">
                      {{ Address.province != Address.leader ? Address.province + '·' : '' }}{{ Address.leader != Address.city ? Address.leader + '·' : '' }}{{ Address.city }}
                    </view>
                  </view>
                  <view>{{ Today.month }}月{{ Today.date }}日</view>
                </view>
                <view class="main today-weather" :style="CityImage != null? 'background-image: url('+CityImage+');':''">
                  <view class="start">
                    <view class="temperature">
                      <view class="status">
                        <view :style="TemperatureStatus == true? 'background:#2196f3;':''" :data-id="true"
                              @tap="SwitchTemperatureStatus">实测
                        </view>
                        <view :style="TemperatureStatus == false? 'background:#2196f3;':''" :data-id="false"
                              @tap="SwitchTemperatureStatus">体感
                        </view>
                      </view>
                      <view class="value">
                        <view v-if="TemperatureStatus == true">{{ RealTimeWeather.Temperature.Current }}°</view>
                        <view v-if="TemperatureStatus == false">{{ RealTimeWeather.Temperature.Somatosensory }}°</view>
                      </view>
                    </view>
                    <view class="type">
                      <view class="title">{{ RealTimeWeather.Weather.Type }}</view>
                      <view class="temperature">
                        <view style="color: #F0AD4E;">{{ RealTimeWeather.Temperature.Max }}°</view>
                        <view style="color: #2196f3;">{{ RealTimeWeather.Temperature.Min }}°</view>
                      </view>
                    </view>

                  </view>
                  <view class="end">
                    <view class="item">{{ RealTimeWeather.Wind.Type }}</view>
                    <view class="item">{{ RealTimeWeather.Wind.Meter }}</view>
                    <view class="item">{{ RealTimeWeather.Wind.speed }}</view>
                  </view>
                </view>
              </view>
              <view class="card">
                <view class="header">
                  <text>今日空气</text>
                  <text>{{ RealTimeWeather.Air.Level }}</text>
                </view>
                <view class="main today-air">
                  <view class="item animation-slide-left" style="animation-delay: 0.3s">
                    <view class="title">Pm2.5</view>
                    <view class="content">{{ RealTimeWeather.Air.Pm25 }}</view>
                  </view>
                  <view class="item animation-slide-left" style="animation-delay: 0.6s">
                    <view class="title">湿度</view>
                    <view class="content">{{ RealTimeWeather.Air.Humidity }}</view>
                  </view>
                  <view class="item animation-slide-left" style="animation-delay: 0.9s">
                    <view class="title">气压hPa</view>
                    <view class="content">{{ RealTimeWeather.Air.Pressure }}</view>
                  </view>
                  <view class="item animation-slide-left" style="animation-delay: 1.2s">
                    <view class="title">能见度</view>
                    <view class="content">{{ RealTimeWeather.Air.Visibility }}</view>
                  </view>
                </view>
              </view>
              <view class="card">
                <view class="header">
                  <text>Tips</text>
                </view>
                <view class="main today-tips">
                  <text>{{ RealTimeWeather.Air.Tips }}</text>
                </view>
              </view>
              <view class="card">
                <view class="header">每小时</view>
                <view class="main">
                  <scroll-view class="hours" scroll-x="true">
                    <view class="item" v-for="(item,index) in OneWeekWeather[0].Hours" v-bind:key="index"
                          v-if="item.hours >= 8 && Today.date == OneWeekWeather[0].Date.Date && item.hours >= Today.hours">
                      <view class="title">{{ item.title }}</view>
                      <view class="weather">{{ item.wea }}</view>
                      <view class="tem">{{ item.tem }}</view>
                    </view>
                    <view class="item date" v-if="Today.date == OneWeekWeather[0].Date.Date">
                      {{ OneWeekWeather[1].Date.Date }}
                    </view>

                    <view class="item" v-for="(item,index) in OneWeekWeather[0].Hours" v-bind:key="index"
                          v-if="item.hours < 8  && (Today.date == OneWeekWeather[0].Date.Date || item.hours >= Today.hours)">
                      <view class="title">{{ item.title }}</view>
                      <view class="weather">{{ item.wea }}</view>
                      <view class="tem">{{ item.tem }}</view>
                    </view>
                    <view class="item" v-for="(item,index) in OneWeekWeather[1].Hours" v-bind:key="index"
                          v-if="index < 16">
                      <view class="title">{{ item.title }}</view>
                      <view class="weather">{{ item.wea }}</view>
                      <view class="tem">{{ item.tem }}</view>
                    </view>
                    <view class="item date">{{ OneWeekWeather[2].Date.Date }}</view>
                    <view class="item" v-for="(item,index) in OneWeekWeather[1].Hours" v-bind:key="index"
                          v-if="index >= 16">
                      <view class="title">{{ item.title }}</view>
                      <view class="weather">{{ item.wea }}</view>
                      <view class="tem">{{ item.tem }}</view>
                    </view>
                    <view class="item" v-for="(item,index) in OneWeekWeather[2].Hours" v-bind:key="index"
                          v-if="index < 16">
                      <view class="title">{{ item.title }}</view>
                      <view class="weather">{{ item.wea }}</view>
                      <view class="tem">{{ item.tem }}</view>
                    </view>
                  </scroll-view>
                </view>
              </view>
              <view class="card">
                <view class="header">
                  <view>一周天气</view>
                  <view @click="more(key)">更多</view>
                </view>
                <view class="main week-weather">
                  <view class="item animation-slide-left" v-for="(item,index) in OneWeekWeather" v-bind:key="index"
                        :style="Today.date == item.Date.Date? 'color:#2196f3;animation-delay: ' + (index+1)*0.2 + 's':'color:#000000;animation-delay: ' + (index+1)*0.2 + 's'">
                    <view :style="Today.date == item.Date.Date? 'color:#2196f3;':'color:#9e9e9e;'">
                      {{ item.Date.Week }}
                    </view>
                    <view>{{ item.Date.Date }}</view>
                    <view class="weather">{{ item.Weather.Type }}</view>
                    <view>{{ item.Temperature.Max }}</view>
                    <view>{{ item.Temperature.Min }}</view>
                  </view>
                </view>
              </view>
              <view class="card">
                <view class="header">
                  <view>指数</view>
                </view>
                <view class="main index">
                  <view class="item" v-for="(item,index) in OneWeekWeather[0].Index" v-bind:key="index" :id="item.desc"
                        @click="ShowIndexDesc(item.desc)">
                    <view class="icon">
                      <icon-awesome-component-vue :icon="item.icon" size="20px"/>
                    </view>
                    <view class="title">{{ item.title }}</view>
                    <view class="level">{{ item.level }}</view>
                  </view>
                </view>
              </view>
              <view class="card">
                <view class="header">
                  <view>广告</view>
                </view>
                <view class="main ad-bar">
                  <!-- #ifdef MP-WEIXIN -->
                  <ad unit-id="adunit-86ce23bbd3c7393e"></ad>
                  <!-- #endif -->
                  <!-- #ifdef MP-QQ -->
                  <ad unit-id="c5e6d691147cc2f04445eb0b5c84bf90" type="card"></ad>
                  <!-- #endif -->
                </view>
              </view>
              <view class="copyright">Powered By Omnia96</view>
            </view>
          </scroll-view>
        </swiper-item>
      </swiper>
    </div>
    <start-up-component-vue v-if="StartupStatus"></start-up-component-vue>
    <navigation-component-vue :StatusBarHeight="StatusBarHeight"
                              :NavigationBarItems="NavigationBarItems"/>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import IconAwesomeComponentVue from '../../components/IconAwesome/IconAwesome.component.vue';
import NavigationComponentVue from '../../components/Navigation/Navigation.component.vue';
import IconFreecnsComponentVue from '../../components/IconFreecns/IconFreecns.component.vue';
import {systemInfoService} from '../../core/service/service.module';
import {Time} from '../../core/libs/time';
import {CityData} from '../../core/libs/cityData';
import {StorageService} from '../../core/service/storage/storage.service';
import {storages} from '../../core/config/config.module';
import StartUpComponentVue from '../../components/StartUp/StartUp.component.vue';
import Component from 'vue-class-component';

const QQMapWX = require('../../static/js/qqmap.js');
// #ifdef MP-WEIXIN
let interstitialAd: any = {};
declare const wx: any;
// #endif
@Component({components: {
  IconAwesomeComponentVue,
  IconFreecnsComponentVue,
  NavigationComponentVue,
  StartUpComponentVue,
}})
export default class Home extends Vue {
  private StatusBarHeight = systemInfoService.systemInfo.statusBarHeight;
  private Today: any = {};
  private Address = null;
  private StartupStatus = true;
  private RealTimeWeather = null;
  private OneWeekWeather = null;
  private CityImage = null;
  private TemperatureStatus = true;
  private MainSwiper = 0;
  private StarCityList = {} || undefined;
  private NavigationBarItems = [
    {icon: 'fa-home', title: '首页', path: '../home/home', selected: true},
    {icon: 'fa-exclamation-circle', title: '关于', path: '../about/about', selected: false},
  ];
  public onLoad() {
    this.GetCityCode();
    // #ifdef MP-QQ
    uni.hideTabBar();
    // #endif
    // #ifdef MP-WEIXIN
    // 在页面onLoad回调事件中创建插屏广告实例
    this.CreateAd();
    // #endif
  }
  public onReady() {
    // #ifdef MP-WEIXIN
    // 在适合的场景显示插屏广告
    this.ShowAds();
    // #endif
  }
  public onShow() {
    this.SetToday();
    this.MainSwiper = 0;
    new StorageService(storages.starCityList).get().then((res) => {
      this.StarCityList = res;
    });
  }
  public onHide() {
    this.MainSwiper = 0;
  }
  // 创建广告
  public CreateAd() {
    // #ifdef MP-WEIXIN
    if (wx.createInterstitialAd) {
      interstitialAd = wx.createInterstitialAd({
        adUnitId: 'adunit-7c80ea03afc3f4f5',
      });
      interstitialAd.onLoad(() => {
      });
      interstitialAd.onError((err: any) => {
      });
      interstitialAd.onClose(() => {
      });
    }
    // #endif
  }
  // 显示广告
  public ShowAds() {
    // #ifdef MP-WEIXIN
    setTimeout(() => {
      if (interstitialAd) {
        interstitialAd.show().catch((err: any) => {
          console.error(err);
        });
      }
    }, 5000);
    // #endif
  }
  MainSwiperChange(e: any) {
    const current = e.detail.current;
    this.CityImage = null;
    this.MainSwiper = 0;
    this.StarCityData(current);
  }
  SetToday() {
    const date = new Date();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    this.Today = {
      month: month,
      date: day,
      hours: hours,
    };
  }
  GetAddress(location: any) {
    const txmap = new QQMapWX({key: 'QG2BZ-4OS3U-QNUVG-4RYJG-C54ZZ-3ZFCW'});
    return new Promise((resolve, reject) => {
      txmap.reverseGeocoder({
        location: {
          latitude: location['latitude'],
          longitude: location['longitude'],
        },
        success: (res: any) => {
          resolve(res.result.address_component);
        },
      });
    });
  }
  async GetCityCode() {
    let location: any = await uni.getLocation({type: 'gcj02'});
      location.length > 1 ? location = location[1] : location = null;
      let cityname: any = null;
      location != null ? cityname = await this.GetAddress(location) : cityname = {
        'province': '北京',
        'city': '北京市',
        'district': '北京',
        'street': '天安门',
      };
      cityname['icon'] = true;
      this.Address = cityname;
      let citylist = new CityData().citys;
      let keyword = cityname.province;
      citylist = this.cityis(keyword, citylist, 'provinceZh');
      keyword = cityname.city;
      citylist = this.cityis(keyword, citylist, 'leaderZh');
      keyword = cityname.district;
      citylist = this.cityis(keyword, citylist, 'cityZh');
      const citycode = citylist[0].id;
      // let StarCityList = Cache.get("StarCityList")
      const storageService = new StorageService(storages.starCityList);
      storageService.get().then((res) => {
        this.StarCityList = res;
      }).catch((err) => {
        storages.starCityList.value = [{citycode: citycode, cityname: cityname}];
        this.StarCityList = [{citycode: citycode, cityname: cityname}];
        storageService.set().then((res) => {
          console.log(res);
        }).catch((err) => {
          console.log(err);
        });
      });
      this.Cache_Is(citycode);
  }
  cityis(keyword: any, citylist: any, key: string) {
    keyword = keyword.split('');
    let word = '';
    for (const index in keyword) {
      const array = [];
      word = word + keyword[index];
      for (const child in citylist) {
          citylist[child][key].indexOf(word) != -1 ? array.push(citylist[child]) : '';
      }
        array.length > 0 ? citylist = array : '';
    }
    return citylist;
  }
  Cache_Is(citycode: any) {
    const realTimeWeatherStorageService = new StorageService(storages.realTimeWeather(citycode));
    realTimeWeatherStorageService.get().then((res) => {
      this.SetRealTimeWeather(res, citycode);
      this.StartupStatus = false;
    }).catch((err) => {
      this.GetRealTimeWeather(citycode);
    });
    const oneWeekWeatherStorageService = new StorageService(storages.oneWeekWeather(citycode));
    oneWeekWeatherStorageService.get().then((res) => {
      this.SetOneWeekWeather(res, citycode);
      this.StartupStatus = false;
    }).catch((err) => {
      this.GetOneWeekWeather(citycode);
    });
  }
  async GetRealTimeWeather(citycode: any) {
    let result: any = await uni.request({
      url: 'https://www.tianqiapi.com/api/?version=v61&appid=06369426&appsecret=VVM7jMR0',
      data: {cityid: citycode},
    });
    result = result[1]['data'];
    const RealTimeWeather: any = {
      Air: {
        Index: result.air,
        Level: result.air_level,
        Pm25: result.air_pm25,
        Tips: result.air_tips,
        Humidity: result.humidity,
        Pressure: result.pressure,
        Visibility: result.visibility,
      },
      Address: {
        Country: result.country,
        City: result.city,
        CityId: result.cityid,
      },
      Weather: {
        Type: result.wea,
        Icon: result.wea_img,
      },
      Temperature: {
        Current: result.tem,
        Max: result.tem1,
        Min: result.tem2,
      },
      Wind: {
        Type: result.win,
        Meter: result.win_meter,
        speed: result.win_speed,
      },
    };
    const V = this.ReturnWindSpeed(RealTimeWeather.Wind.speed);
    const T = RealTimeWeather.Temperature.Current;
    const RH = parseInt(RealTimeWeather.Air.Humidity);
    const AT = this.ReturnAT(T, V, RH);
    RealTimeWeather['Temperature']['Somatosensory'] = AT;
    this.RealTimeWeather = RealTimeWeather;
    new StorageService(storages.realTimeWeather(
        citycode,
        {
          create_time: new Time().currentTime(),
          data: RealTimeWeather,
        },
    )).set().then((res) => {
      console.log('缓存实时天气成功！');
    });
  }
  async GetOneWeekWeather(citycode: any) {
    let result: any = await uni.request({
      url: 'https://www.tianqiapi.com/api/',
      data: {version: 'v9', appid: '06369426', appsecret: 'VVM7jMR0', cityid: citycode},
    });
    result = result[1]['data']['data'];
    console.log(result);
    const OneWeekWeather: any = [];
    for (const key in result) {
      const week = result[key].week.substr(result[key].week.length - 1, 1);
      const date = parseInt(result[key].day.split('日')[0]);
      const type = result[key].wea;
      const max = result[key].tem1;
      const min = result[key].tem2;
      const index = result[key].index;
      index[0]['title'] = '紫外线';
      index[1]['title'] = '运动';
      index[2]['title'] = '血糖';
      index[3]['title'] = '穿衣';
      index[4]['title'] = '洗车';
      index[5]['title'] = '空气污染';
      index[0]['icon'] = 'fa-sun-o';
      index[1]['icon'] = 'fa-child';
      index[2]['icon'] = 'fa-heartbeat';
      index[3]['icon'] = 'fa-male';
      index[4]['icon'] = 'fa-car';
      index[5]['icon'] = 'fa-envira';
      const hours = result[key].hours;
      for (const keychild in hours) {
        hours[keychild]['hours'] = hours[keychild]['hours'].split('时')[0];
        hours[keychild]['title'] = hours[keychild]['hours'] + ':00';
      }
      OneWeekWeather[key] = {
        Date: {
          Week: week,
          Date: date,
        },
        Weather: {
          Type: type,
        },
        Temperature: {
          Max: max,
          Min: min,
        },
        Index: index,
        Hours: hours,
      };
    }
    console.log(OneWeekWeather);
    this.OneWeekWeather = OneWeekWeather;
    new StorageService(storages.oneWeekWeather(
        citycode,
        {
          create_time: new Time().currentTime(),
          data: OneWeekWeather,
        },
    )).set().then((res) => {
      console.log('缓存一周天气成功!');
    });
  }
  SetRealTimeWeather(RealTimeWeather: any, citycode: any) {
    const create_time = RealTimeWeather.create_time;
    const data = RealTimeWeather.data;
    if (new Time().timeDifference(create_time, new Time().currentTime()) <= 30) {
      this.RealTimeWeather = data;
    } else {
      this.GetRealTimeWeather(citycode);
    }
  }
  SetOneWeekWeather(OneWeekWeather: any, citycode: any) {
    const create_time = OneWeekWeather.create_time;
    const data = OneWeekWeather.data;
    if (new Time().timeDifference(create_time, new Time().currentTime()) <= 90) {
      this.OneWeekWeather = data;
    } else {
      this.GetOneWeekWeather(citycode);
    }
  }
  ReturnAT(T: any, V: any, RH: any) {
    const e = (RH / 100) * 6.105 * Math.exp((17.27 * T) / (237.7 + T));
    const AT = (1.07 * T) + (0.2 * e) - (0.65 * V) - 2.7;
    return AT.toFixed(0);
  }
  ReturnWindSpeed(WindLevel: any) {
    WindLevel = parseInt(WindLevel);
    switch (WindLevel) {
      case 0:
        return 0.1;
        break;
      case 1:
        return 0.9;
        break;
      case 2:
        return 2.45;
        break;
      case 3:
        return 4.4;
        break;
      case 4:
        return 6.7;
        break;
      case 5:
        return 9.35;
        break;
      case 6:
        return 12.3;
        break;
      case 7:
        return 15.5;
        break;
      case 8:
        return 18.95;
        break;
      case 9:
        return 22.6;
        break;
      case 10:
        return 26.45;
        break;
      default:
        return 0.1;
        break;
    }
  }
  SwitchTemperatureStatus(e: any) {
    const status = e.currentTarget.dataset.id;
    this.TemperatureStatus = status;
  }
  async StarCityData(current: any) {
    new StorageService(storages.starCityList).get().then((res) => {
      this.Cache_Is(res[current].citycode);
      this.Address = res[current].cityname;
    });
  }
  ShowIndexDesc(desc: string) {
    uni.showToast({
      title: desc,
      icon: 'none',
    });
  }
  more(key: number) {
    // let address:any = this.Address;
    const starCityList: any = this.StarCityList;
    uni.navigateTo({
      url: './monthWeather/monthWeather?city=' + starCityList[key].citycode,
    });
  }
}
</script>
<style lang="stylus" scoped>
.page
  background #ffffff
  .status-bar
    width 100%
    position fixed
    top 0
    background #FFFFFF
    z-index 1
  .header
    width: 100%
    height: 80upx
    display: flex
    justify-content: center
    align-items: center
    .icon
      width: 80upx;
      height: 80upx;
    .name
      font-size: 32upx;
      margin-left: 2vw;
      margin-right: 2vw;
      font-weight: bold;
      color: #9e9e9e;
    .current
      font-size: 32upx;
      font-weight: bold;
  .card
    width: 100%
    height: auto
    padding 0 25upx
    .header
      width: 100%;
      height: 80upx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 32upx;
      font-weight: bold;
      .address
        display: flex;
        align-items: center;
        justify-content: space-around
        .right
          margin-left: 2vw;
          font-weight: normal;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          max-width: 45vw;
          font-size: 28upx;
    .main
      width: 100%;
      padding: 15upx
      box-shadow: 0 4upx 8upx rgba(0, 0, 0, 0.16), 0 4upx 8upx rgba(0, 0, 0, 0.23);
  .today-weather
    height: auto
    display: flex;
    flex-direction: column;
    background-size: 100%, 100%;
    .start
      display: flex;
      height: 15vw;
      .temperature
        display: flex;
        height: 15vw;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        .status
          display: flex;
          width: 15vw;
          height: 40upx;
          align-items: center;
          justify-content: center;
          font-size: 24upx;
          view
            width: 7.5vw;
            height: 40upx;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(0, 0, 0, 0.16);
            color: #FFFFFF;
        .value
          width: 15vw;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 60upx;
      .type
        height: 15vw;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-between;
        margin-left: 2vw;
        .title
          font-size: 50upx;
        .temperature
          display: flex;
          flex-direction: row
          font-size: 24upx;
          align-items: center;
          view
            margin-right: 1vw;
    .end
      display: flex;
      font-size: 24upx;
      .item
        margin-right: 1vw;
  .today-air
    display: flex;
    align-items: center;
    justify-content: space-between;
    .item
      font-size: 24upx;
      display: flex;
      flex-direction: column;
      align-items: center;
      .title
        color: #9e9e9e;
      .content
        font-size: 28upx;
        color: black;
  .today-tips
    font-size: 28upx
  .hours
    width: 100%;
    height: 130upx;
    white-space: nowrap;
    line-height: 130upx;
    .item
      display: inline-block;
      width: 18vw;
      height: 130upx;
      text-align: center;
      vertical-align: middle;
      .title
        font-size: 24upx;
        font-weight: bold;
        color: #9E9E9E;
        height: 40upx;
        line-height: 40upx;
      .weather
        font-size: 28upx;
        font-weight: bold;
        height: 50upx;
        line-height: 50upx;
      .tem
        font-size: 24upx;
        font-weight: bold;
        height: 40upx;
        line-height: 40upx;
    .date
      width: 80upx;
      height: 80upx;
      line-height: 80upx;
      display: inline-block;
      vertical-align: middle;
      color: #9E9E9E;
      font-size: 32upx;
      font-weight: bold;
      background: rgba(0, 0, 0, 0.05);
  .week-weather
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    .item
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      font-size: 28upx;
      font-weight: bold;
      view
        min-height: 50upx;
        display: flex;
        align-items: center;
        justify-content: center;
      .weather
        writing-mode: tb-rl;
        height: 160upx;
        white-space: nowrap;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 24upx;
  .index
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    .item
      width: 28vw;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      font-size: 24upx;
      margin-top: 2vw;
      margin-bottom: 2vw;
      .icon
        width: 50upx;
        height: 50upx;
      .title
        color: #9E9E9E;
        height: 40upx;
        display: flex;
        justify-content: center;
        align-items: center;
      .level
        height: 40upx;
        display: flex;
        justify-content: center;
        align-items: center;
  .ad-bar
    // #ifdef MP-WEIXIN
    padding: 0 !important;
    // #endif
    // #ifdef MP-QQ
    padding: 25upx 0 !important;
    // #endif
    ad
      width: 100%;
  .copyright
    margin-top: 5vw;
    font-size: 32upx;
    color: #9e9e9e;
    margin-bottom: 100upx;
</style>
