export class SystemInfoService {
    systemInfo!: UniApp.GetSystemInfoResult
    constructor() {
      this.getSystemInfo();
    }
    private getSystemInfo() {
      uni.getSystemInfo({
        success: (result) => {
          this.systemInfo = result;
        },
      });
    }
}
