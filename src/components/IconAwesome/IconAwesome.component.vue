<template>
  <view class="icon">
    <i :class="'fa '+ icon" :style="'font-size:'+size+';color:'+color+';'"/>
  </view>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';
@Component
export default class IconAwesomeComponent extends Vue {
  @Prop({type: String, default: 'fa-home'})
  private icon!: string;
  @Prop({type: String, default: '16px'})
  private size!: string;
  @Prop({type: String, default: 'black'})
  private color!: string;
}
</script>
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
