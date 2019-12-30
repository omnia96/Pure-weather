<style lang="stylus" scoped>
    .status-bar
        width 100%
        position fixed
        top 0
        background #FFFFFF
        z-index 1
    .header
        width: 100%
        height: 40px
        display: flex
        justify-content: center
        align-items: center
        .icon
            width: 40px;
            height: 40px;
        .name
            font-size: 16px;
            margin-left: 2vw;
            margin-right: 2vw;
            font-weight: bold;
            color: #9e9e9e;
        .current
            font-size: 16px;
            font-weight: bold;
    .card
        width: 94vw
        height: auto
        .header
            width: 100%;
            height: 40px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 16px;
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
                    font-size: 14px;
        .main
	        width: 90vw;
	        padding: 2vw;
	        box-shadow:  0 2px 4px rgba(0,0,0,0.16),0 2px 4px rgba(0,0,0,0.23);
    .today-weather
        height: 19.5vw;
        display: flex;
        flex-direction: column;
        background-size: 100%,100%;
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
                    height: 20px;
                    align-items: center;
                    justify-content: center;
                    font-size: 12px;
                    view
                        width: 7.5vw;
                        height: 20px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        background: rgba(0,0,0,0.16);
                        color: #FFFFFF;
                .value
                    width: 15vw;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 30px;
            .type
                height: 15vw;
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                justify-content: space-between;
                margin-left: 2vw;
                .title
                    font-size: 25px;
                .temperature
                    display: flex;
                    font-size: 12px;
                    align-items: center;
                    view
                        margin-right: 1vw;
        .end
            display: flex;
            font-size: 12px;
            .item
                margin-right: 1vw;
    .today-air
        display: flex;
        align-items: center;
        justify-content: space-between;
        .item
            font-size: 12px;
            display: flex;
            flex-direction: column;
            align-items: center;
            .title
                color: #9e9e9e;
            .content
                font-size: 14px;
                color: black;
    .today-tips
        font-size: 14 
    .hours
        width: 90vw;
        height: 65px;
        white-space: nowrap;
        line-height: 65px;
        .item
            display: inline-block;
            width: 18vw;
            height: 65px;
            text-align: center;
            vertical-align: middle;
            .title
                font-size: 12px;
                font-weight: bold;
                color: #9E9E9E;
                height: 20px;
                line-height: 20px;
            .weather
                font-size: 14px;
                font-weight: bold;
                height: 25px;
                line-height: 25px;
            .tem
                font-size: 12px;
                font-weight: bold;
                height: 20px;
                line-height: 20px;
        .date
            width: 40px;
            height: 40px;
            line-height: 40px;
            display: inline-block;
            vertical-align: middle;
            color: #9E9E9E;
            font-size: 16px;
            font-weight: bold;
            background: rgba(0,0,0,0.05);
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
            font-size: 14px;
            font-weight: bold;
            view
                min-height: 25px;
                display: flex;
                align-items: center;
                justify-content: center;
            .weather
                writing-mode: tb-rl;
                height: 80px;
                white-space:nowrap;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 12px;
    .index
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        .item
            width: 30vw;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-around;
            font-size: 12px;
            margin-top: 2vw;
            margin-bottom: 2vw;
            .title
                color: #9E9E9E;
                height: 20px;
                display: flex;
                justify-content: center;
                align-items: center;
            .level
                height: 20px;
                display: flex;
                justify-content: center;
                align-items: center;
    .ad-bar
        padding: 0;
        width: 94vw;
        ad
            width: 100%;
    .copyright
        margin-top: 5vw;
        font-size: 16px;
        color: #9e9e9e;
        margin-bottom: 50px;

</style>
<template>
    <div class="page">
        <div class="status-bar" :style="'height:' + StatusBarHeight + 'px;'"></div>
        <div class="container">
            <view class="header" :style="'margin-top:calc(45px + '+StatusBarHeight+'px);'">
				<view class="icon"><icon-freecns-component-vue icon="Cumulus-Cloud" color="#2196f3" size="20px"/></view>
				<view class="name">Pure · 简天气</view>
				<view class="current">首页</view>
			</view>
            <swiper :style="'width:100%;height:calc(100vh - 85px - ' + StatusBarHeight + 'px);' " :current="MainSwiper" @animationfinish="MainSwiperChange" >
				<swiper-item v-for="(value,key) in StarCityList" v-bind:key="key">
					<scroll-view scroll-y style="width: 100%; height: 100%;">
						<view style="width: 100%;height: 100%;display: flex;flex-direction: column;align-items: center;">
							<view class="card">
								<view class="header">
									<view>今日天气</view>
									<view class="address">
										<view class="left" v-if="Address.icon == true"><icon-awesome-component-vue icon="fa-map-marker"/></view>
										<view class="right" v-if="Address.icon == true">{{Address.district}}·{{Address.street}}</view>
										<view class="right" v-if="Address.icon == false">{{Address.province != Address.leader? Address.province + '·':''}}{{Address.leader != Address.city? Address.leader + '·':''}}{{Address.city}}</view>
									</view>
									<view>{{Today.month}}月{{Today.date}}日</view>
								</view>
								<view class="main today-weather" :style="CityImage != null? 'background-image: url('+CityImage+');':''">
									<view class="start">
										<view class="temperature">
											<view class="status">
												<view :style="TemperatureStatus == true? 'background:#2196f3;':''" :data-id="true" @tap="SwitchTemperatureStatus">实测</view>
												<view :style="TemperatureStatus == false? 'background:#2196f3;':''" :data-id="false" @tap="SwitchTemperatureStatus">体感</view>
											</view>
											<view class="value">
												<view v-if="TemperatureStatus == true">{{RealTimeWeather.Temperature.Current}}°</view>
												<view v-if="TemperatureStatus == false">{{RealTimeWeather.Temperature.Somatosensory}}°</view>
											</view>
										</view>
										<view class="type">
											<view class="title">{{RealTimeWeather.Weather.Type}}</view>
											<view class="temperature">
												<view style="color: #F0AD4E;">{{RealTimeWeather.Temperature.Max}}°</view>
												<view style="color: #2196f3;">{{RealTimeWeather.Temperature.Min}}°</view>
											</view>
										</view>
										
									</view>
									<view class="end">
										<view class="item">{{RealTimeWeather.Wind.Type}}</view>
										<view class="item">{{RealTimeWeather.Wind.Meter}}</view>
										<view class="item">{{RealTimeWeather.Wind.speed}}</view>
									</view>
								</view>
							</view>
							<view class="card">
								<view class="header">
									<text>今日空气</text>
									<text>{{RealTimeWeather.Air.Level}}</text>
								</view>
								<view class="main today-air">
									<view class="item">
									  <view class="title">Pm2.5</view>
									  <view class="content">{{RealTimeWeather.Air.Pm25}}</view>
									</view>
									<view class="item">
									  <view class="title">湿度</view>
									  <view class="content">{{RealTimeWeather.Air.Humidity}}</view>
									</view>
									<view class="item">
									  <view class="title">气压hPa</view>
									  <view class="content">{{RealTimeWeather.Air.Pressure}}</view>
									</view>
									<view class="item">
									  <view class="title">能见度</view>
									  <view class="content">{{RealTimeWeather.Air.Visibility}}</view>
									</view>
								</view>
							</view>
							<view class="card">
								<view class="header">
									<text>Tips</text>
								</view>
								<view class="main today-tips">
									<text>{{RealTimeWeather.Air.Tips}}</text>
								</view>
							</view>
							<view class="card">
								<view class="header">每小时</view>
								<view class="main">
									<scroll-view class="hours" scroll-x="true">
										<view class="item" v-for="(item,index) in OneWeekWeather[0].Hours" v-bind:key="index" v-if="item.hours >= 8 && Today.date == OneWeekWeather[0].Date.Date && item.hours >= Today.hours">
											<view class="title">{{item.title}}</view>
											<view class="weather">{{item.wea}}</view>
											<view class="tem">{{item.tem}}</view>
										</view>
										<view class="item date" v-if="Today.date == OneWeekWeather[0].Date.Date">{{OneWeekWeather[1].Date.Date}}</view>
										
										<view class="item" v-for="(item,index) in OneWeekWeather[0].Hours" v-bind:key="index" v-if="item.hours < 8  && (Today.date == OneWeekWeather[0].Date.Date || item.hours >= Today.hours)">
											<view class="title">{{item.title}}</view>
											<view class="weather">{{item.wea}}</view>
											<view class="tem">{{item.tem}}</view>
										</view>
										<view class="item" v-for="(item,index) in OneWeekWeather[1].Hours" v-bind:key="index" v-if="index < 16">
											<view class="title">{{item.title}}</view>
											<view class="weather">{{item.wea}}</view>
											<view class="tem">{{item.tem}}</view>
										</view>
										<view class="item date">{{OneWeekWeather[2].Date.Date}}</view>
										<view class="item" v-for="(item,index) in OneWeekWeather[1].Hours" v-bind:key="index" v-if="index >= 16">
											<view class="title">{{item.title}}</view>
											<view class="weather">{{item.wea}}</view>
											<view class="tem">{{item.tem}}</view>
										</view>
										<view class="item" v-for="(item,index) in OneWeekWeather[2].Hours" v-bind:key="index" v-if="index < 16">
											<view class="title">{{item.title}}</view>
											<view class="weather">{{item.wea}}</view>
											<view class="tem">{{item.tem}}</view>
										</view>
									</scroll-view>
								</view>
							</view>
							<view class="card">
								<view class="header">
									<view>一周天气</view>
								</view>
								<view class="main week-weather">
									<view class="item" v-for="(item,index) in OneWeekWeather" v-bind:key="index" :style="Today.date == item.Date.Date? 'color:#2196f3;':'color:#000000;'">
										<view :style="Today.date == item.Date.Date? 'color:#2196f3;':'color:#9e9e9e;'">{{item.Date.Week}}</view>
										<view>{{item.Date.Date}}</view>
										<view class="weather">{{item.Weather.Type}}</view>
										<view>{{item.Temperature.Max}}</view>
										<view>{{item.Temperature.Min}}</view>
									</view>
								</view>
							</view>
							<view class="card">
								<view class="header">
									<view>指数</view>
								</view>
								<view class="main index">
									<view class="item" v-for="(item,index) in OneWeekWeather[0].Index" v-bind:key="index" :id="item.desc" @tap="ShowIndexDesc">
										<view class="icon"><IconAwesome :icon="item.icon" size="20px"/></view>
										<view class="title">{{item.title}}</view>
										<view class="level">{{item.level}}</view>
									</view>
								</view>
							</view>
							<view class="card">
								<view class="header">
									<view>广告</view>
								</view>
								<view class="main ad-bar">
									<ad unit-id="adunit-86ce23bbd3c7393e"></ad>
								</view>
							</view>
							<view class="copyright" >Powered By Omnia96</view>
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
        </div>
        <navigation-component-vue :StatusBarHeight="StatusBarHeight" :NavigationBarItems="NavigationBarItems"/>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
import IconAwesomeComponentVue from '../../components/IconAwesome/IconAwesome.component.vue';
import NavigationComponentVue from '../../components/Navigation/Navigation.component.vue';
import IconFreecnsComponentVue from '../../components/IconFreecns/IconFreecns.component.vue';
import TxMap from '../../libs/qqmap';
import Data from "../../libs/data.js";
import Cache from "../../libs/cache.js";
import Time from "../../libs/time.js";

export default Vue.extend({
    components:{
        IconAwesomeComponentVue,
        IconFreecnsComponentVue,
        NavigationComponentVue
    },
    data(){
        return {
            StatusBarHeight:0,
            Today: undefined||{},
            Address:null,
            StartupStatus: true,
            RealTimeWeather:null,
            OneWeekWeather:null,
            CityImage:null,
            TemperatureStatus:true,
            MainSwiper:0,
            StarCityList:{}||undefined,
            NavigationBarItems:[
                {icon: 'fa-home',title: '首页',path: '../home/home',selected: true},
                {icon: 'fa-exclamation-circle',title: '关于',path: '../about/about',selected: false}
            ]
        }
    },
    onLoad(){
        this.SetStatusBarHeight()
        this.GetCityCode()
    },
    onShow() {
        this.SetToday()
        this.MainSwiper = 0
        let StarCityList = Cache.get("StarCityList")
        this.StarCityList = StarCityList
    },
    onHide() {
        this.MainSwiper = 0
    },
    methods:{
        MainSwiperChange(e:any){
            let current = e.detail.current
            this.CityImage = null
            this.MainSwiper = 0
            this.StarCityData(current)
        },
        SetToday(){
            let date = new Date()
            let month = date.getMonth() + 1
            let day = date.getDate()
            let hours = date.getHours()
            this.Today = {
                month:month,
                date:day,
                hours:hours
            }
        },
        async SetStatusBarHeight(){
            let result:any = await uni.getSystemInfo()
            console.log(result);
            let statusBarHeight:number = result[1].statusBarHeight
            this.StatusBarHeight = statusBarHeight
        },
        GetAddress(location:any){
				let txmap = new TxMap({key : 'QG2BZ-4OS3U-QNUVG-4RYJG-C54ZZ-3ZFCW'})
				return new Promise((resolve,reject)=>{
					txmap.reverseGeocoder({
						location:{
							latitude: location["latitude"],
							longitude: location["longitude"]
						},
						success: (res:any) => {
							resolve(res.result.address_component)
						}
					})
				})
			},
        async GetCityCode(){
				let location:any = await uni.getLocation({type:"gcj02"})
				location.length > 1 ? location = location[1] : location = null
				let cityname:any = null
				location != null ? cityname = await this.GetAddress(location) : cityname = {"province":"北京","city":"北京市","district":"北京","street":"天安门"},
				cityname["icon"] = true
				this.Address = cityname
				let citylist = Data.CityList()
				let keyword = cityname.province
				citylist = this.cityis(keyword,citylist,"provinceZh")
				keyword = cityname.city
				citylist = this.cityis(keyword,citylist,"leaderZh")
				keyword = cityname.district
				citylist = this.cityis(keyword,citylist,"cityZh")
				let citycode = citylist[0].id
				let StarCityList = Cache.get("StarCityList")
				StarCityList == false? (Cache.set("StarCityList",[{citycode:citycode,cityname:cityname}]),this.StarCityList = [{citycode:citycode,cityname:cityname}]):(StarCityList[0]["citycode"] = citycode,StarCityList[0]["cityname"] = cityname,this.StarCityList = StarCityList,Cache.set("StarCityList",StarCityList))
				this.Cache_Is(citycode)
				let cityimage:any = Data.CityImage()
				for(const name in cityimage){
					cityname.city == name? this.CityImage = cityimage[name]:""
				}
        },
        cityis(keyword:any,citylist:any,key:string){
				keyword = keyword.split("")
				let word = ""
				for (const index in keyword){
					let array = []
					word = word + keyword[index]
					for(const child in citylist){
						citylist[child][key].indexOf(word) != -1? array.push(citylist[child]):""
					}
					array.length > 0? citylist = array : ""
				}
				return citylist
        },
        Cache_Is(citycode:any){
				let RealTimeWeather = Cache.get("RealTimeWeather-" + citycode)
				RealTimeWeather == false ? this.GetRealTimeWeather(citycode) : this.SetRealTimeWeather(RealTimeWeather,citycode)
				let OneWeekWeather = Cache.get("OneWeekWeather-" + citycode)
				OneWeekWeather == false ? this.GetOneWeekWeather(citycode) : this.SetOneWeekWeather(OneWeekWeather,citycode)
				this.StartupStatus = false
				
        },
        async GetRealTimeWeather(citycode:any){
				let result:any = await uni.request({url:"https://www.tianqiapi.com/api/?version=v61&appid=06369426&appsecret=VVM7jMR0",data:{cityid: citycode}})
				result = result[1]["data"]
				let RealTimeWeather:any = {
					Air:{
						Index: result.air,
						Level: result.air_level,
						Pm25: result.air_pm25,
						Tips: result.air_tips,
						Humidity: result.humidity,
						Pressure: result.pressure,
						Visibility: result.visibility
					},
					Address: {
						Country: result.country,
						City: result.city,
						CityId: result.cityid
					},
					Weather: {
						Type: result.wea,
						Icon: result.wea_img
					},
					Temperature: {
						Current: result.tem,
						Max: result.tem1,
						Min: result.tem2
					},
					Wind: {
						Type: result.win,
						Meter: result.win_meter,
						speed: result.win_speed
					}
				}
				let V = this.ReturnWindSpeed(RealTimeWeather.Wind.speed)
				let T = RealTimeWeather.Temperature.Current
				let RH = parseInt(RealTimeWeather.Air.Humidity)
				let AT = this.ReturnAT(T,V,RH)
				RealTimeWeather["Temperature"]["Somatosensory"] = AT
				this.RealTimeWeather = RealTimeWeather
				Cache.set("RealTimeWeather-" + citycode,{"create_time":Time.CurrentTime(),"data":RealTimeWeather})
			},
			async GetOneWeekWeather (citycode:any) {
				let  result:any = await uni.request({url: 'https://www.tianqiapi.com/api/', data: {version:"v9",appid:"06369426",appsecret:"VVM7jMR0",cityid: citycode}})
				result = result[1]["data"]["data"]
				console.log(result);
				let OneWeekWeather:any = []
				for(const key in result){
					let week = result[key].week.substr(result[key].week.length - 1,1)
					let date = parseInt(result[key].day.split("日")[0])
					let type = result[key].wea
					let max = result[key].tem1
					let min = result[key].tem2
					let index = result[key].index
					index[0]["title"] = "紫外线"
					index[1]["title"] = "运动"
					index[2]["title"] = "血糖"
					index[3]["title"] = "穿衣"
					index[4]["title"] = "洗车"
					index[5]["title"] = "空气污染"
					index[0]["icon"] = "fa-sun-o"
					index[1]["icon"] = "fa-child"
					index[2]["icon"] = "fa-heartbeat"
					index[3]["icon"] = "fa-male"
					index[4]["icon"] = "fa-car"
					index[5]["icon"] = "fa-envira"
					let hours = result[key].hours
					for(const keychild in hours){
						hours[keychild]["hours"] = hours[keychild]["hours"].split("时")[0]
						hours[keychild]["title"] = hours[keychild]["hours"] + ":00"
					}
					OneWeekWeather[key] = {
						Date: {
							Week: week,
							Date: date
						},
						Weather: {
							Type: type
						},
						Temperature: {
							Max: max,
							Min: min
						},
						Index: index,
						Hours: hours
					}
				}
				console.log(OneWeekWeather)
				this.OneWeekWeather = OneWeekWeather
				Cache.set("OneWeekWeather-" + citycode,{"create_time":Time.CurrentTime(),"data":OneWeekWeather})
            },
        SetRealTimeWeather(RealTimeWeather:any,citycode:any){
            let create_time = RealTimeWeather.create_time
            let data = RealTimeWeather.data
            Time.TimeDifference(create_time,Time.CurrentTime()) <= 30 ? this.RealTimeWeather = data : this.GetRealTimeWeather(citycode)
        },
        SetOneWeekWeather(OneWeekWeather:any,citycode:any){
            let create_time = OneWeekWeather.create_time
            let data = OneWeekWeather.data
            Time.TimeDifference(create_time,Time.CurrentTime()) <= 90 ? this.OneWeekWeather = data : this.GetOneWeekWeather(citycode)
        },
        ReturnAT(T:any,V:any,RH:any){
            let e = (RH / 100) * 6.105 * Math.exp((17.27 * T)/(237.7 + T))
            let AT = (1.07 * T) + (0.2 * e) - (0.65 * V) - 2.7
            return AT.toFixed(0)
        },
        ReturnWindSpeed(WindLevel:any){
            WindLevel = parseInt(WindLevel)
            switch (WindLevel){
                case 0:
                    return 0.1
                    break
                case 1:
                    return 0.9
                    break
                case 2:
                    return 2.45
                    break
                case 3:
                    return 4.4
                    break
                case 4:
                    return 6.7
                    break
                case 5:
                    return 9.35
                    break
                case 6:
                    return 12.3
                    break
                case 7:
                    return 15.5
                    break
                case 8:
                    return 18.95
                    break
                case 9:
                    return 22.6
                    break
                case 10:
                    return 26.45
                    break
                default:
                    return 0.1
                    break
            }
        },
        SwitchTemperatureStatus(e:any){
            let status = e.currentTarget.dataset.id
            this.TemperatureStatus = status
        },
        async StarCityData(current:any){
            let StarCityList = Cache.get("StarCityList")
            let citycode = StarCityList[current].citycode
            this.Address = StarCityList[current].cityname
            this.Cache_Is(citycode)
            let cityimage = Data.CityImage()
            if(current == 0){
                for(const name in cityimage){
                    StarCityList[current].cityname.city == name? this.CityImage = cityimage[name]:""
                }
            }else{
                for(const name in cityimage){
                    name.indexOf(StarCityList[current].cityname.leader) != -1? this.CityImage = cityimage[name]:""
                }
            }
        }
    }
})
</script>