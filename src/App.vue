<!--
 * @Author: Omnia96
 * @Date: 2021-04-08 17:59:42
 * @LastEditors: Omnia96
 * @LastEditTime: 2021-09-18 17:25:07
 * @Description: App
 * @FilePath: /pure-weather/src/App.vue
-->
<script lang="ts">
import Vue from 'vue';
import {UpdateService} from '@/core/service/update.service';
export default Vue.extend({
  mpType: 'app',
  onLaunch() {
    console.log('App Launch');
    new UpdateService();
    // #ifdef MP-WEIXIN
    uni.hideTabBar();
    // #endif
  },
  onShow() {
    console.log('App Show');
  },
  onHide() {
    console.log('App Hide');
  },
});
</script>

<style lang="scss">
    /*每个页面公共css */
    @import 'uview-ui/theme.scss';
    .page{
        background: #ffffff;
    }
</style>
