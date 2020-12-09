<style>
	@import "awesome.css";
	.icon{
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
<template>
	<view class="icon">
		<i :class="'fa '+ icon" :style="'font-size:'+size+';color:'+color+';'"/>
	</view>
</template>

<script>

import Vue from 'vue';
export default Vue.extend({
  props: {
    icon: {
      type: String,
      default: 'fa-home',
    },
    size: {
      type: String,
      default: '16px',
    },
    color: {
      type: String,
      default: 'black',
    },
  },
});
</script>
