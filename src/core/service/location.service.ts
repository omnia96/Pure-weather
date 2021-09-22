/*
 * @Author: Omnia96
 * @Date: 2021-04-08 17:59:42
 * @LastEditors: Omnia96
 * @LastEditTime: 2021-09-21 19:43:59
 * @Description: 位置服务
 * @FilePath: /pure-weather/src/core/service/location.service.ts
 */
import {Observable, Subject} from 'rxjs';
import {fromPromise} from 'rxjs/internal-compatibility';
import {map} from 'rxjs/operators';

export class LocationService {
  constructor() {}
  public isAuthorized() {
    return fromPromise(new Promise<{errMsg: string}>((resolve, reject) => {
      uni.authorize({
        scope: 'scope.userLocation',
        success: (result: {errMsg: string}) => {
          resolve(result);
        },
        fail: (result) => {
          console.error(result);
          this.showOpenSettingModal();
          const {errMsg} = result;
          reject(errMsg);
        },
        complete: () => {},
      });
    }));
  }
  public getLocation(): Observable<any> {
    const location$ = new Subject<any>();
    uni.getLocation({
      type: 'gcj02',
      success: (result) => location$.next(result),
      fail: (result) => location$.error(result),
    });
    return location$.pipe(map<any, any>((response) => response));
  }
  private showOpenSettingModal() {
    uni.showModal({
      title: '是否授予位置权限?',
      content: '当前未授予位置权限可能导致天气无法正常使用！',
      confirmText: '打开设置',
      success: (result) => {
        if (result.confirm) {
          uni.openSetting({});
        }
      },
    });
  }
}
