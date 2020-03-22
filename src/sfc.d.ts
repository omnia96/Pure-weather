declare module "*.vue" {
    import Vue from 'vue'
    export default Vue
    import '@/libs/time'
    import '@/libs/cityData'
    import '@/service/storage/storage.service'
    import { routers } from '@/config/config.module';
    import { systemInfoService } from '@/service/service.module'
}