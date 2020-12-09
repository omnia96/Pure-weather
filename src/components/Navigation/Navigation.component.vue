<style lang="stylus">
@import "~@/static/styles/standards/font-size.styl";
@import "~@/static/styles/standards/font-weight.styl";
@import "~@/static/styles/standards/font-color.styl";
@keyframes expand {
  from{
    width: 0px;
  }
}
@keyframes shrink {
  to{
    width: 0px;
  }
}
@keyframes rotate {
  to{
    transform: rotate(360deg);
  }
}
.Navigation
  width 100vw
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .header
    width:100vw;
    height: 90upx;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    background: rgba(255,255,255,0.95);
    .icon
      width: 90upx;
      height: 90upx;
      display: flex;
      align-items: center;
      justify-content: center;
    .icon:hover
      animation: rotate 1s;
  .sidebar
    width:70vw;
    flex: 1;
    box-shadow: 4upx 0 8upx -8upx rgba(0, 0, 0, 0.16),2upx 0 8upx -8upx rgba(0, 0, 0, 0.23);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    overflow: hidden;
    flex-wrap: nowrap;
    background: rgba(255,255,255,0.98);
    .item
      width: 100%;
      padding-left: 2vw;
      padding-right: 2vw;
      height: 12vw;
      margin-top: 1vw;
      margin-bottom: 1vw;
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      align-items: center;
      font-size: subtitle
      font-weight: bold
      color lightText
      white-space nowrap
      overflow hidden
      .icon
        width: 80upx;
        height: 80upx;
        display: flex;
        align-items: center;
        justify-content: center;
      .title
        margin-left: 5vw;
        flex: 1;
    .RelativeField
      width: 100%;
      flex: 1;

</style>
<template>
	<view class="Navigation" :style="NavigationBarStatus==true? 'z-index:1;height:calc(100vh - 40px - '+ StatusBarHeight +'px);top:'+StatusBarHeight+'px;':'height:45px;top:'+StatusBarHeight+'px;'">
		<view class="header">
			<view class="icon" @tap="NavigationBarSwitch">
				<IconAwesomeComponentVue icon="fa-bars" size="40rpx" color="black"/>
			</view>
		</view>
		<view class="sidebar" v-if="NavigationBarStatus == true" :style="'animation: '+ SwitchAnimation +' 1s;'">
			<view class="item" v-for="(item,index) in NavigationBarItems" @tap="NavigationBarItemSelect" :id="index" v-bind:key="index" :style="item.selected == true? 'background:#2196f3;color:white;':''">
				<view class="icon">
					<IconAwesomeComponentVue :icon="item.icon" size="20px" :color="item.selected == true? 'white':''"/>
				</view>
				<view class="title">{{item.title}}</view>
			</view>
			<view class="RelativeField"></view>
		</view>
		<tool-component-vue/>
	</view>
</template>

<script>
import Vue from 'vue';
import IconAwesomeComponentVue from '../IconAwesome/IconAwesome.component.vue';
import ToolComponentVue from './Tool/Tool.component.vue';
export default Vue.extend({
  props: {
    StatusBarHeight: Number,
    NavigationBarItems: Array,
  },
  data() {
    return {
      NavigationBarStatus: false,
      SwitchAnimation: 'expand',
    };
  },
  components: {
    IconAwesomeComponentVue,
    ToolComponentVue,
  },
  methods: {
    NavigationBarSwitch() {
      const that = this;
      if (that.$data.NavigationBarStatus == false) {
        that.SwitchAnimation = 'expand';
        that.NavigationBarStatus = !that.$data.NavigationBarStatus;
      } else {
        that.SwitchAnimation = 'shrink';
        setTimeout(function() {
          that.NavigationBarStatus = !that.$data.NavigationBarStatus;
        }, 1000);
      }
    },
    NavigationBarItemSelect(e) {
      const that = this;
      const selectedId = e.currentTarget.id;
      const NavigationBarItems = that.$props.NavigationBarItems;
      if (NavigationBarItems[selectedId].selected == false) {
        that.SwitchAnimation = 'shrink';
        setTimeout(function() {
          that.NavigationBarStatus = false;
          uni.switchTab({
            url: NavigationBarItems[selectedId]['path'],
          });
        }, 950);
      } else {
        that.SwitchAnimation = 'shrink';
        setTimeout(function() {
          that.NavigationBarStatus = false;
        }, 950);
      }
    },
  },
});
</script>
