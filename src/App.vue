<script lang="ts">
    import Vue from 'vue';
    import { appService, systemInfo } from './App.module';
    export default Vue.extend({
        mpType: 'app',
        onLaunch() {
            console.log('App Launch')
            uni.hideTabBar()
            appService.getSystemInfo()
            console.log(systemInfo);
            console.log(appService.systemInfo);
        },
        onShow() {
            console.log('App Show')
        },
        onHide() {
            console.log('App Hide')
        }
    });
</script>

<style>
    /*每个页面公共css */
</style>
