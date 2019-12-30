export class AppService {
    systemInfo:SystemInfo|undefined
    constructor() {
        // this.getSystemInfo()
    }
    // async getSystemInfo() {
    //     let result:Result<SystemInfo> = <Result<SystemInfo>> <unknown>await uni.getSystemInfo()
    //     console.log(typeof result);
    //     console.log(result);
    //     console.log(result[0]);
    //     console.log(result[1]);
    //     this.systemInfo = result[1]
    // }
    getSystemInfo(callback:Function){
        uni.getSystemInfo({
            success:(res)=>{
                callback(res)
            }
        })
    }
    getSystemInfoSync(){
        try {
            let systemInfo = this.getSystemInfo()
            if(systemInfo){
                return systemInfo
            }
        } catch (error) {
            
        }
    }
    // async SetStatusBarHeight(){
    //     let result:any = await uni.getSystemInfo()
    //     console.log(result);
    //     let statusBarHeight:number = result[1].statusBarHeight
    //     this.StatusBarHeight = statusBarHeight
    // },
}
interface Result<T> {
    [index:number]:T|any
    length:number
    nv_length:number
}
interface SystemInfo {
    SDKVersion:string
    batteryLevel:number
    benchmarkLevel:number
    brand:string
    errMsg:string
    fontSizeSetting:number
    language:string
    model:string
    pixelRatio:number
    platform:string
    safeArea:object
    screenHeight:number
    screenWidth:number
    statusBarHeight:number
    system:string
    version:string
    windowHeight:number
    windowWidth:number
}