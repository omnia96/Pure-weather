<template>
  <div class="page">
    <scroll-view class="month-weathers" :scroll-x="true">
      <div class="item" v-for="(item, index) in monthWeatheradta" :key="index">
        <div class="weather animation-slide-left" :style="[{'animation-delay': (index+1)*0.2 + 's'}]" >
          <div class="header">
            <div class="date">
              <span>{{item.Date}}</span>
            </div>
            <div class="week">
              <span>{{item.Week}}</span>
            </div>
            <div class="type">
              <span>{{item.Type}}</span>
            </div>
          </div>
          <div class="main">
              <div class="max">
                  <span>{{item.Max}}</span>
              </div>
              <div class="temperature">
                  <div class="start flex flex-direction justify-end">
                      <div :style="[{height: (item.Max*1 + 50) + '%'}]"></div>
                  </div>
                  <div class="end flex flex-direction justify-start">
                      <div :style="[{height: (item.Min*1 + 50) + '%'}]"></div>
                  </div>
              </div>
              <div class="min">
                  <span>{{item.Min}}</span>
              </div>
          </div>
        </div>
      </div>
    </scroll-view>
    <!-- #ifdef MP-WEIXIN -->
    <ad unit-id="adunit-2009e2ee092a6044" ad-type="video" ad-theme="white"></ad>
    <!-- #endif -->
    <!-- #ifdef MP-QQ -->
    <ad unit-id="a7694155dfa8f11edb3d8e7d41767370" type="card"></ad>
    <!-- #endif -->
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import {StorageService} from '../../../core/service/storage.service';
import {storages} from '../../../core/config/config.module';
import {Time} from '../../../core/libs/time';
import Component from 'vue-class-component';
@Component({})
export default class MonthWeather extends Vue {
 private monthWeatheradta: Array<any> = [];
 private title = '月天气';
 private citycode = 0;
 public onLoad(option:any) {
   this.citycode = option.city;
   new StorageService(storages.monthWeatheradta(String(this.citycode))).get().then((res) => {
     if (new Time().timeDifference(res.create_time, new Time().currentTime())>360) {
       this.getdata();
     } else {
       this.monthWeatheradta=res.data;
     }
   }).catch((err) => {
     this.getdata();
   });
 }
 public getdata() {
   uni.request({
     url: 'https://www.tianqiapi.com/api',
     data: {
       version: 'v3',
       appid: '06369426',
       appsecret: 'VVM7jMR0',
       cityid: this.citycode,
     },
     success: (res: any) => {
       const data: Array<any>= res.data.data;
       console.log(data);
       for (const key in data) {
         if (data[key] != null) {
           this.monthWeatheradta.push(
               {
                 Week: data[key].week.substr(data[key].week.length - 1, 1),
                 Date: data[key].date.split('-')[2],
                 Type: data[key].wea,
                 Max: data[key].tem1,
                 Min: data[key].tem2,
               },
           );
         }
       }
       new StorageService(
           storages.monthWeatheradta(String(this.citycode),
               {create_time: new Time().currentTime(), data: this.monthWeatheradta}),
       ).set().then((res) =>{
         console.log('缓存成功');
       });
     },
   });
 }
 public setTemperaturePercentage(temperature: number) {
   if (temperature > 0) {
     return 50 + temperature;
   } else {
     return temperature;
   }
 }
}
</script>
<style lang="stylus">
.page
  display flex
  flex-direction column
.month-weathers
  width 100vw
  height calc(100vh - 546upx)
  white-space: nowrap;
  padding 30upx
  .item
    display inline-block
    width 100upx
    height 100%
.weather
  width 100%
  height 100%
  display flex
  flex-direction column
  align-items center
  .header
    display flex
    flex-direction column
    align-items center
    .date
    .week
      font-size: 28upx;
      font-weight: bold;
    .type
      writing-mode: tb-rl;
      height: 160upx;
      white-space:nowrap;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 24upx;
  .main
    flex 1
    display flex
    flex-direction column
    align-items center
    .temperature
      flex 1
      width 20upx
      display flex
      flex-direction column
      align-items center
      justify-content center
      .start,.end
        width 100%
        height 50%
        div
          background-color #2196f3
      .start div
        border-radius 10upx 10upx 0 0
      .end div
        border-radius 0 0 10upx 10upx
</style>
