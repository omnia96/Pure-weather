<style lang="stylus">
.page
    display flex
    flex-wrap wrap
    justify-content center
    padding 0 auto
    width auto
    margin 0 auto
    .item
        text-align center
        background #FEFEFE
        display flex
        flex-direction column
        .item__top,.item__bottom
            width 13vw
            border 1px solid #cccccc
            border-radius 15upx
            div
                padding 4upx 0
                font-weight bold
            .week
                color #212121
            .weather,.temperature
                color #1481D5
            .weather
                height 84upx
                display flex
                align-items center
                justify-content center
            .temperature
                padding 0
                .max
                    color red
    .ad
        width 100%
        margin 10upx 0
        padding 10upx
</style>
<template>
    <div class="page">
        <div class="item" v-for="(item,index) in monthWeatheradta" :key="index">
            <div class="item__top" v-if="index <= 13">
                <div class="week">{{item.Week}}</div>
                <div class="data">{{item.Date}}</div>
                <div class="weather">{{item.Type}}</div>
                <div class="temperature">
                    <div class="max">{{item.Max}}</div>
                    <div class="min">{{item.Min}}</div>
                </div>
            </div>
        </div>
        <!-- #ifdef MP-WEIXIN -->
        <div class="ad">
            <ad unit-id="adunit-17dbdfa85288bec5" ad-type="grid" grid-opacity="0.8" grid-count="5" ad-theme="white"></ad>
        </div>
        <!-- #endif -->
        <div class="item" v-for="(item,index) in monthWeatheradta" :key="index">
            <div class="item__bottom" v-if="index > 13">
                <div class="week">{{item.Week}}</div>
                <div class="data">{{item.Date}}</div>
                <div class="weather">{{item.Type}}</div>
                <div class="temperature">
                    <div class="max">{{item.Max}}</div>
                    <div class="min">{{item.Min}}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { StorageService } from '../../../service/storage/storage.service'
import { storages } from '../../../config/config.module'
import { Time } from '../../../libs/time'
export default Vue.extend({
    data(){
        let monthWeatheradta: Array<any> = [];
        return{
            title:'月天气',
            monthWeatheradta,
            citycode: 0
        }
    },
    onLoad: function (option:any) {
        this.citycode = option.city
        new StorageService(storages.monthWeatheradta(String(this.citycode))).get().then(res => {
            if(new Time().timeDifference(res.create_time,new Time().currentTime())>360){
                this.getdata();
            }else{
                this.monthWeatheradta=res.data
            }
        }).catch(err => {
            this.getdata();
        });
    },
    methods:{
        getdata(){
            uni.request({
                url:'https://www.tianqiapi.com/api',
                data: {
                    version: "v3",
                    appid:"06369426",
                    appsecret:"VVM7jMR0",
                    cityid:this.citycode
                },
                success: (res: any) => {
                    let data: Array<any>= res.data.data;
                    console.log(data);
                    for (const key in data){
                        if (data[key] != null) {
                            this.monthWeatheradta.push(
                                {
                                    Week: data[key].week.substr(data[key].week.length - 1, 1),
                                    Date: data[key].date.split("-")[2],
                                    Type: data[key].wea,
                                    Max: data[key].tem1,
                                    Min: data[key].tem2
                                }
                            )
                        }
                    }
                    new StorageService(storages.monthWeatheradta(String(this.citycode),{create_time: new Time().currentTime(), data: this.monthWeatheradta})).set().then(res =>{
                        console.log("缓存成功");
                    })

                }
            });
        },
    }
})
</script>