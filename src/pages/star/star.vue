<style lang="stylus" scoped>
	.item
		width 100%
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
<template>
    <view class="page">
		<view class="container">
			<view class="current item">
				<icon-awesome-component-vue class="icon" icon="fa-map-marker" size="20px"/>
				<view class="title">{{StarCityList[0].cityname.district}}-{{StarCityList[0].cityname.street}}</view>
				<view class="subtitle">您当前位置</view>
			</view>
			<view class="item" v-for="(item,index) in StarCityList" v-bind:key="index" v-if="index > 0">
				<icon-awesome-component-vue class="icon" icon="fa-ellipsis-v" size="6vw"/>
				<view class="title">{{item.cityname.province != item.cityname.leader? item.cityname.province + "-":""}}{{item.cityname.leader != item.cityname.city? item.cityname.leader + "-":""}}{{item.cityname.city}}</view>
				<icon-awesome-component-vue class="icon" icon="fa-trash-o" size="6vw" :data-index="index" :data-item="item" @tap="DeleteThis"/>
			</view>
		</view>
	</view>
</template>
<script lang="ts">
import Vue from 'vue'
import IconAwesomeComponentVue from '../../components/IconAwesome/IconAwesome.component.vue'
import { StorageService } from '../../service/storage/storage.service'
import { storages } from '../../config/config.module'
export default Vue.extend({
    data() {
		let StarCityList: any;
		return {
			StarCityList
		}
	},
	components:{IconAwesomeComponentVue},
	onLoad(){
		new StorageService(storages.starCityList).get().then(res => {
			this.StarCityList = res;
		});
	},
	methods:{
		DeleteThis(e:any){
			let index = e.currentTarget.dataset.index
			let item = e.currentTarget.dataset.item
			let title = ""
			item.cityname.province != item.cityname.leader? title = title + item.cityname.province + "-":title = title
			item.cityname.leader != item.cityname.city? title = title + item.cityname.leader + "-":title = title,
			title = title + item.cityname.city
			const storageService = new StorageService(storages.starCityList);
			storageService.get().then(res => {
				res.splice(index,1);
				this.StarCityList = res;
				if(storageService.storage) {
					storageService.storage.value = res;
				}
				storageService.set().then(res => {
					storageService.remove().then(res=>{
						uni.showToast({
							icon:"none",
							title:title + "已从收藏城市列表中删除"
						})
					});
				});
			});
		}
	}
})
</script>