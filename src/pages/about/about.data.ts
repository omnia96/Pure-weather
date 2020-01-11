
import { version } from '@/config/config.module';
import { systemInfoService } from '@/service/service.module';
export class AboutData {
    statusBarHeight = systemInfoService.systemInfo.statusBarHeight;
    version = version;
    navigationBarItems = [
        {icon: 'fa-home',title: '首页',path: '../home/home',selected: false},
        {icon: 'fa-exclamation-circle',title: '关于',path: '../about/about',selected: true}
    ];
}