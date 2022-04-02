/*
 * @Author: Omnia96
 * @Date: 2021-04-08 17:59:42
 * @LastEditors: Omnia96
 * @LastEditTime: 2021-09-21 19:43:00
 * @Description: 地址服务
 * @FilePath: /pure-weather/src/core/service/address.service.ts
 */
import {fromPromise} from 'rxjs/internal-compatibility';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {CityData} from '@/core/libs/cityData';
import {LocationService} from '@/core/service/location.service';
import {Area} from '@/core/models/area';
import {jsonp} from 'vue-jsonp';

const QQMapWX = require('../../static/js/qqmap.js');
export class AddressService {
  private getAddressByQQMap(location: any) {
    const txmap = new QQMapWX({key: 'QG2BZ-4OS3U-QNUVG-4RYJG-C54ZZ-3ZFCW'});
    let promise;
    // #ifdef H5
    promise = new Promise((resolve, reject) => {
      jsonp(
          'https://apis.map.qq.com/ws/geocoder/v1/',
          {
            location: location['latitude'] + ',' + location['longitude'],
            key: 'QG2BZ-4OS3U-QNUVG-4RYJG-C54ZZ-3ZFCW',
            get_poi: 1,
            output: 'jsonp',
          },
      ).then(({result}: any) => {
        resolve(result.address_component);
      });
    });
    // #endif
    // #ifndef H5
    promise = new Promise((resolve, reject) => {
      txmap.reverseGeocoder({
        location: {
          latitude: location['latitude'],
          longitude: location['longitude'],
        },
        success: (res: any) => resolve(res.result.address_component),
      });
    });
    // #endif
    return fromPromise<any>(promise);
  }
  public area() {
    return new LocationService().isAuthorized().pipe(
        switchMap(() => new LocationService().getLocation().pipe()),
        catchError((res) => {
          return of({latitude: '39.908823', longitude: '116.397470'});
        }),
        switchMap((location) => this.getAddressByQQMap(location).pipe(
            map((response) => {
              let citylist = new CityData().citys;
              let keyword = response.province;
              citylist = this.cityis(keyword, citylist, 'provinceZh');
              keyword = response.city;
              citylist = this.cityis(keyword, citylist, 'leaderZh');
              keyword = response.district;
              citylist = this.cityis(keyword, citylist, 'cityZh');
              return new Area(
                  citylist[0].id,
                  response.province,
                  response.city,
                  response.district,
                  response.street,
              );
            }),
        )),
    );
  }
  public getAddressName() {

  }
  private cityis(keyword: any, citylist: any, key: string) {
    keyword = keyword.split('');
    let word = '';
    for (const index in keyword) {
      if (keyword.hasOwnProperty(index)) {
        const array = [];
        word = word + keyword[index];
        for (const child in citylist) {
          if (citylist.hasOwnProperty(child)) {
            citylist[child][key].indexOf(word) != -1 ? array.push(citylist[child]) : '';
          }
        }
      array.length > 0 ? citylist = array : '';
      }
    }
    return citylist;
  }
}
