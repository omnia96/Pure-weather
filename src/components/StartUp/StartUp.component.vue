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

<template>
	<view class="startup">
    <view class="loading">
      <icon-freecns-component-vue icon="Cumulus-Sun" size="25vw" color="#ff9800"></icon-freecns-component-vue>
    </view>
    <view class="startup-content">
      <view class="content-logo">
        <icon-freecns-component-vue icon="Cumulus-Cloud" size="25px" color="#2196F3"></icon-freecns-component-vue>
      </view>
      <view class="content-title">Pure · 简天气</view>
    </view>
  </view>
</template>
<script lang="ts">
import Vue from 'vue';
import IconFreecnsComponentVue from '../IconFreecns/IconFreecns.component.vue';
export default Vue.extend({
  data() {
    return {};
  },
  components: {
    IconFreecnsComponentVue,
  },
});
</script>
