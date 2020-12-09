<!--
 * @Author: Omnia96
 * @Date: 2020-01-13 16:22:55
 * @LastEditors: Omnia96
 * @LastEditTime: 2020-01-13 17:11:43
 * @Description:
 * @FilePath: \pure-weather\src\components\Navigation\Tool\Tool.component.vue
 -->
<template>
  <view class="Navigation-Tool">
    <view class="Navigation-Tool-item" @tap="GoToStar">
      <IconAwesomeComponentVue icon="fa-globe" size="20px" color="black"/>
    </view>
    <view class="Navigation-Tool-item" @tap="GoToSearch">
      <IconAwesomeComponentVue icon="fa-search" size="20px" color="black"/>
    </view>
    <view class="Navigation-Tool-item share">
      <button open-type="share">
        <IconAwesomeComponentVue icon="fa-share-alt" size="20px" color="black"/>
      </button>
    </view>
  </view>
</template>

<script lang="ts">
import Vue from 'vue';
import IconAwesomeComponentVue from '../../IconAwesome/IconAwesome.component.vue';
import Component from 'vue-class-component';
@Component({components: {
  IconAwesomeComponentVue,
}})
export default class ToolComponent extends Vue {
  public GoToSearch() {
    uni.navigateTo({
      url: '../search/search',
    });
  }
  public GoToStar() {
    uni.navigateTo({
      url: '../star/star',
    });
  }
}
</script>
<style>
.Navigation-Tool{
  width:100vw;
  height: 40px;
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.16),0 2px 4px rgba(0,0,0,0.23);
  background: rgba(255,255,255,0.95);
}
.Navigation-Tool-item{
  width: 40px;
  height: 40px;
  margin-right: 1vw;
  display: flex;
  align-items: center;
  justify-content: center;
}
.share button{
  background: none;
  display: flex;
  align-items: center;
  justify-content: center;
}
.share button::after{
  border: none;
}
</style>

