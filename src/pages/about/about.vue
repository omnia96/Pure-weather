<style lang="stylus" scoped>
    .status-bar
        width: 100%
    .container
        width 100%
        display flex
        flex-direction column
        align-items center
        justify-content flex-start
        .header
            margin-top: 45px;
            width: 100%;
            height: 40px;
            display: flex;
            justify-content: center;
            align-items: center;
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
        .logo
            width: 20vw;
            height: 20vw;
        .version
            font-size: 14px;
            font-weight: 500;
            color: #9e9e9e;
            margin-bottom: 5vw;
        .group
            width: 94vw;
            box-shadow: 0 2px 4px rgba(0,0,0,0.16),0 2px 4px rgba(0,0,0,0.23);
            .item
                width: 94VW;
                border-radius: 0;
                height: 40px;
                display: flex;
                font-size: 16px;
                background: none;
                align-items: center;
                margin-top: 1vw;
                margin-bottom: 1vw;
                padding: 0;
                margin: 0;
                .icon
                    width: 40px;
                    height: 40px;
                .title
                    flex: 1;
                    text-align: left;
                    font-weight: 500;
            .item::after
                border: none;
                margin: 0;

</style>
<template>
    <div class="page">
		<view class="status-bar" :style="'height:'+ statusBarHeight + 'px;'"></view>
		<view class="container">
			<view class="header">
				<view class="icon"><IconFreecns icon="Cumulus-Cloud" color="#2196f3" size="20px"/></view>
				<view class="name">Pure · 简天气</view>
				<view class="current">关于</view>
			</view>
			<view class="logo">
				<icon-freecns-component-vue icon="Cumulus-Cloud" color="#2196f3" size="14vw"/>
			</view>
			<view class="version">Pure · 简天气 {{version}}</view>
			<view class="group">
				<view class="item" @tap="opneSetting">
					<icon-awesome-component-vue class="icon" icon="fa-lock"/>
					<view class="title">授权管理</view>
					<icon-awesome-component-vue class="icon" icon="fa-caret-right"/>
				</view>
                <view class="item" @tap="toLogs">
					<icon-awesome-component-vue class="icon" icon="fa-bookmark"/>
					<view class="title">更新日志</view>
					<icon-awesome-component-vue class="icon" icon="fa-caret-right"/>
				</view>
                <!-- #ifdef MP-WEIXIN -->
                <button open-type="contact" class="item">
                    <icon-awesome-component-vue class="icon" icon="fa-commenting"/>
                    <view class="title">在线联系</view>
                    <icon-awesome-component-vue class="icon" icon="fa-caret-right"/>
                </button>
                <!-- #endif -->
			</view>
		</view>
        <navigation-component-vue :StatusBarHeight="statusBarHeight" :NavigationBarItems="navigationBarItems"/>
    </div>
</template>
<script lang="ts">
    import Vue from 'vue'
    import NavigationComponentVue from '../../components/Navigation/Navigation.component.vue'
    import IconFreecnsComponentVue from '../../components/IconFreecns/IconFreecns.component.vue'
    import IconAwesomeComponentVue from '../../components/IconAwesome/IconAwesome.component.vue'
    import { version } from '../../core/config/config.module'
    import { systemInfoService } from '../../core/service/service.module'
    export default Vue.extend({
        components:{
            NavigationComponentVue,
            IconFreecnsComponentVue,
            IconAwesomeComponentVue
        },
        data(){
            return {
                version: version,
                statusBarHeight: systemInfoService.systemInfo.statusBarHeight,
                navigationBarItems:[
                    {icon: 'fa-home',title: '首页',path: '../home/home',selected: false},
                    {icon: 'fa-exclamation-circle',title: '关于',path: '../about/about',selected: true}
                ]
            }
        },
        methods: {
			opneSetting(){
				uni.openSetting({})
            },
            toLogs() {
                uni.navigateTo({
                    url: '/views/pages/about/log/log'
                });
            }
        }
    })
</script>
