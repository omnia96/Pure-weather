<style lang="stylus" scoped>
	.search
		margin-top 1vw
		width 100%
		height 12vw
		padding-left 2vw
		padding-right 2vw
		background #FFFFFF
		display flex
		align-items center
		justify-content center
		box-shadow 0 2px 4px rgba(0,0,0,0.16),0 2px 4px rgba(0,0,0,0.23)
		input
			width 84vw
			height 12vw
			line-height 10vw
			font-size 1rem
		.icon
			width 12vw
			height 12vw
	.index
		width 100vw
		height 50vh
		box-shadow 0 2px 4px rgba(0,0,0,0.16),0 2px 4px rgba(0,0,0,0.23)
		position absolute
		background rgba(255,255,255,0.95)
		top 12vw
		view
			width 96vw
			height 10vw
			padding-left 2vw
			padding-right 2vw
			font-size 0.9rem
			
	.card
		width 100vw
		height auto
		display flex
		flex-direction column
		align-items center
		.card-title
			width 96vw
			height 40px
			display flex
			align-items center
			justify-content space-between
			font-size 1rem
			font-weight bold
			.icon
				width 40px
				height 40px
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
</style>
<template>
	<view class="page">
		<view class="container">
			<view class="search">
				<input type="text" @input="SetIndex" v-model="text">
				<icon-awesome-component-vue class="icon" icon="fa-search" size="5vw" color="#333333" @tap="but"/>
			</view>
			<scroll-view class="index" scroll-y="true" v-if="Index.length != null">
				<view v-for="(item,index) in Index" v-bind:key="index" :data-value="item" @tap="SelectCity">{{item.provinceZh != item.leaderZh? item.provinceZh + '-':''}}{{item.leaderZh != item.cityZh? item.leaderZh + '-':''}}{{item.cityZh}}</view>
			</scroll-view>
			<view class="history card">
				<view class="card-title">
					<view>历史记录</view>
					<icon-awesome-component-vue class="icon" icon="fa-trash-o" size="1rem"/>
				</view>
				<view class="card-content">
					<view v-for="(item,index) in SearchHistory" v-bind:key="index" :data-value="item" @tap="AddThis">{{item.cityZh}}</view>
				</view>
			</view>
			<view class="popular card">
				<view class="card-title">热门城市</view>
				<view class="card-content">
					<view :data-value="{id:'101010100',provinceZh:'北京',leaderZh:'北京',cityZh:'北京'}" @tap="AddThis">北京</view>
					<view :data-value="{id:'101020100',provinceZh:'上海',leaderZh:'上海',cityZh:'上海'}" @tap="AddThis">上海</view>
					<view :data-value="{id:'101280101',provinceZh:'广东',leaderZh:'广州',cityZh:'广州'}" @tap="AddThis">广州</view>
					<view :data-value="{id:'101280601',provinceZh:'广东',leaderZh:'深圳',cityZh:'深圳'}" @tap="AddThis">深圳</view>
					<view :data-value="{id:'101180101',provinceZh:'河南',leaderZh:'郑州',cityZh:'郑州'}" @tap="AddThis">郑州</view>
					<view :data-value="{id:'101110101',provinceZh:'陕西',leaderZh:'西安',cityZh:'西安'}" @tap="AddThis">西安</view>
					<view :data-value="{id:'101190101',provinceZh:'江苏',leaderZh:'南京',cityZh:'南京'}" @tap="AddThis">南京</view>
					<view :data-value="{id:'101210101',provinceZh:'浙江',leaderZh:'杭州',cityZh:'杭州'}" @tap="AddThis">杭州</view>
					<view :data-value="{id:'101200101',provinceZh:'湖北',leaderZh:'武汉',cityZh:'武汉'}" @tap="AddThis">武汉</view>
					<view :data-value="{id:'101270101',provinceZh:'四川',leaderZh:'成都',cityZh:'成都'}" @tap="AddThis">成都</view>
					<view :data-value="{id:'101070101',provinceZh:'辽宁',leaderZh:'沈阳',cityZh:'沈阳'}" @tap="AddThis">沈阳</view>
					<view :data-value="{id:'101030100',provinceZh:'天津',leaderZh:'天津',cityZh:'天津'}" @tap="AddThis">天津</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script lang="ts">
import Vue from 'vue'
import IconAwesomeComponentVue from '../../components/IconAwesome/IconAwesome.component.vue'
import { systemInfoService } from '../../service/service.module'
import { CityData } from '../../libs/cityData'
import { StorageService } from '../../service/storage/storage.service'
import { storages } from '../../config/config.module'
    export default Vue.extend({
		data() {
			return {
				text:"",
				Index:{},
				SearchHistory:null,
				statusBarHeight: systemInfoService.systemInfo.statusBarHeight
			}
		},
		components:{
            IconAwesomeComponentVue
		},
		onLoad() {
			const storageService = new StorageService(storages.searchHistory);
			console.log();
			storageService.get().then(res => {
				this.SearchHistory = res;
			}).catch(err => {
				storageService.set();
			});
		},
		methods:{
			but(){
				console.log(this.text);
				let Index = []
				Index.push(this.text)
				this.Index = Index
			},
			SetIndex(e:any){
				console.log(e)
				let value = e.detail.value
				let Index = []
				if(value.length > 0){
					let CityList = new CityData().citys;
					for(const key in CityList){
						CityList[key]["provinceZh"].indexOf(value) != -1 || CityList[key]["leaderZh"].indexOf(value) != -1 || CityList[key]["cityZh"].indexOf(value) != -1? Index.push(CityList[key]):""
					}
					this.Index = Index
				}else{
					this.Index = {}
				}
			},
			SelectCity(e:any){
				let value = e.currentTarget.dataset.value
				const storageService = new StorageService(storages.searchHistory);
				storageService.get().then(res => {
					res.push(value);
					res.length > 4 ? res.splice(0,1) : ''
					this.SearchHistory = res;
					this.Index = {};
					this.AddToStar(value);
					if(storageService.storage) {
						storageService.storage = res;
					}
					storageService.set();
				});
			},
			AddThis(e:any){
				let value = e.currentTarget.dataset.value
				this.AddToStar(value)
			},
			AddToStar(value:any){
				let StarCityList = []
				let city = {
					citycode:value.id,
					cityname:{
						icon:false,
						province:value.provinceZh,
						leader:value.leaderZh,
						city:value.cityZh
					}
				}
				const storageService = new StorageService(storages.searchHistory);
				storageService.get().then(res => {
					res.push(res);
					if(res.length > 5) {
						res.splice(1,1);
					}
					if(storageService.storage){
						storageService.storage.value = res;
					}
					storageService.set().then(res => {
						uni.navigateBack({
							delta:1
						})
					});
				});
			}
		}
	})
</script>
