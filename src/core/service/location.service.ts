import {Observable, Subject} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {AddressService} from '@/core/service/address.service';

export class LocationService {
  constructor() {
    this.isAuthorized().subscribe(
        (response) => {
          console.log(response);
        },
        (error) => this.showOpenSettingModal(),
    );
  }
  public isAuthorized() {
    const isAuthorized$ = new Subject();
    uni.authorize({
      scope: 'scope.userLocation',
      success: (result) => isAuthorized$.next(),
      fail: (result) => isAuthorized$.error(result),
    });
    return isAuthorized$.pipe(
        switchMap(() => this.getLocation()),
        switchMap((location) => new AddressService().getAddressCode(location)),
    );
  }
  private getLocation(): Observable<any> {
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
