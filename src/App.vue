<script lang="ts">
    import Vue from 'vue';
    import { StorageService } from './service/storage/storage.service';
import { storages } from './config/config.module';
    export default Vue.extend({
        mpType: 'app',
        onLaunch() {
            console.log('App Launch')
            uni.hideTabBar()
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
