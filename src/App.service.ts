export class AppService {
    systemInfo:SystemInfo = {};
    constructor() {
        this.getSystemInfo()
    }
    async getSystemInfo() {
        let result:Result<SystemInfo> = <Result<SystemInfo>> <unknown>await uni.getSystemInfo()
        this.systemInfo = result[1]
    }
}
interface Result<T> {
    [index:number]:T|any
    length:number
    nv_length:number
}
interface SystemInfo {
    SDKVersion?:string
    batteryLevel?:number
    benchmarkLevel?:number
    brand?:string
    errMsg?:string
    fontSizeSetting?:number
    language?:string
    model?:string
    pixelRatio?:number
    platform?:string
    safeArea?:object
    screenHeight?:number
    screenWidth?:number
    statusBarHeight?:number
    system?:string
    version?:string
    windowHeight?:number
    windowWidth?:number
}