import {SystemInfo, Result} from './systemInfo.interface';

export class SystemInfoService {
    systemInfo:SystemInfo = {};
    constructor() {
      this.getSystemInfo();
    }
    async getSystemInfo() {
      const result:Result<SystemInfo> = <Result<SystemInfo>> <unknown> await uni.getSystemInfo();
      this.systemInfo = result[1];
    }
}
