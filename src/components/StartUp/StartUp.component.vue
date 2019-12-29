<template>
	<view class="startup">
    <view class="loading">
      <IconFreecns icon="Cumulus-Sun" size="25vw" color="#ff9800"/>
    </view>
    <view class="startup-content">
      <view class="content-logo">
        <IconFreecns icon="Cumulus-Cloud" size="25px" color="#2196F3"/>
      </view>
      <view class="content-title">Pure · 简天气</view>
    </view>
  </view>
</template>

<script>
	import IconFreecns from '@/components/IconFreecns.vue'
	export default {
		data() {
			return {
				
			};
		},
		components:{
			IconFreecns
		}
	}
</script>

<style>
	.startup{
    width: 100vw;
    height: 100vh;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    position: fixed;
    background: rgba(255, 255, 255, 0.98);
    z-index:1;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
  }
  .loading{
    width: 100%;
    height:calc(100vh - 40vw);
    display: flex;
    justify-content: center;
    align-items: center;
    animation: rotate 3s infinite;
  }
  .startup-content{
    width:100vw;
    height: 40vw;
    display: flex;
    overflow: hidden;
    justify-content: center;
    align-items: center;
  }
  .content-logo{
    width: 10vw;
  }
  .content-title{
    font-size: 16px;
    font-weight: bold;
    margin-left: 2vw;
  }
  @keyframes rotate{
    50%{
      transform:rotate(180deg);
    }
  }
</style>
