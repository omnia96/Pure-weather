<style lang="stylus">
.page
    display flex
    flex-wrap wrap
    padding 0 20upx
    .item
        width 14.28%
        text-align center
        border 1px solid #cccccc
        border-radius 15upx
        background #FEFEFE
        display flex
        flex-direction column
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
</style>
<template>
    <div class="page">
        <div class="item" v-for="(item,index) in monthWeatheradta" :key="index">
            <div class="week">{{item.Week}}</div>
            <div class="data">{{item.Date}}</div>
            <div class="weather">{{item.Type}}</div>
            <div class="temperature">
                <div class="max">{{item.Max}}</div>
                <div class="min">{{item.Min}}</div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    data(){
        return{
            title:'月天气',
            monthWeatheradta:Array,
            citycode:Number
        }
    },
    onLoad: function (option:any) {
        this.citycode = option.city
    },
    methods:{
        
        getdata(){
            uni.request({
                url:'https://tianqiapi.com/api?version=v3&appid=&appsecret=',
                data: {
                    appid:"06369426",
                    appsecret:"VVM7jMR0",
                    cityid:this.citycode
                },
                success: (res:any) => {
                    let datas = res.data.data
                    let monthWeatheradta:any = []
                    for(let key in datas){
					    let week = datas[key].week.substr(datas[key].week.length - 1,1)
                        let date = parseInt(datas[key].date.split("-")[2])
                        let type = datas[key].wea
                        let max = datas[key].tem1
                        let min = datas[key].tem2
                        monthWeatheradta[key] = {
                            Week: week,
                            Date: date,
                            Type: type,
                            Max: max,
                            Min: min
                        }
                    }
                    this.monthWeatheradta=monthWeatheradta
                }
            });
        },
    },
    mounted(){
        this.getdata();
    }
})
</script>