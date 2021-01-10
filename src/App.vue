<script lang="ts">
import Vue from 'vue';
import {UpdateService} from '@/core/service/update.service';
export default Vue.extend({
  mpType: 'app',
  onLaunch() {
    console.log('App Launch');
    new UpdateService();
    uni.hideTabBar();
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
