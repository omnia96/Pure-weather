import { AppService } from './App.service';
const appService:AppService = new AppService();
let systemInfo:any

let setSystem = (res:any) => {systemInfo = res}
appService.getSystemInfo(setSystem)
console.log(systemInfo);

export {
    appService,
    systemInfo
}