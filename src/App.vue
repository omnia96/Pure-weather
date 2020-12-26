<script lang="ts">
import Vue from 'vue';
import {LocationService} from '@/core/service/location.service';
export default Vue.extend({
  mpType: 'app',
  onLaunch() {
    console.log('App Launch');
    uni.hideTabBar();
    new LocationService();
  },
  onShow() {
    console.log(this);
    console.log('App Show');
  },
  onHide() {
    console.log('App Hide');
  },
});
</script>

<style>
    /*每个页面公共css */
    .page{
        background: #ffffff;
    }
</style>
