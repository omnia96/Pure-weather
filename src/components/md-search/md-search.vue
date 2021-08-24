<template>
  <div class="md-search">
    <div class="md-search-content">
      <u-search bg-color="transparent"
                :disabled="true"
                height="90"
                :show-action="false"
                placeholder="搜索城市和地区"></u-search>
      <u-avatar size="76" @click="popupStatus = !popupStatus"></u-avatar>
    </div>
  </div>
</template>
<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
@Component
export default class mdSearch extends Vue {
  private popupStatus = false;
}
</script>
<style lang="stylus">
.md-search
  width 100%
  padding 20rpx 40rpx
  &-content
    border-radius 10rpx
    background-color #eeeeee
    display flex
    align-items center
    justify-content space-between
    padding-right 20rpx
</style>
