declare module '*.vue' {
    import Vue from 'vue';
    export default Vue;
    import '@/core/libs/time';
    import '@/core/libs/cityData';
    import '@/core/service/storage/storage.service';
    import {routers} from '@/core/config/config.module';
    import {systemInfoService} from '@/core/service/service.module';
}
