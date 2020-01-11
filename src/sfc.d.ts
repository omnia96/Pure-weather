declare module "*.vue" {
    import Vue from 'vue'
    export default Vue
    import { routers } from '@/config/config.module';
    import { systemInfoService } from '@/service/service.module'
}