import {fromPromise} from 'rxjs/internal-compatibility';
import {catchError, map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {CityData} from '@/core/libs/cityData';

const QQMapWX = require('../../static/js/qqmap.js');
export class AddressService {
  private getAddress(location: any) {
    const txmap = new QQMapWX({key: 'QG2BZ-4OS3U-QNUVG-4RYJG-C54ZZ-3ZFCW'});
    const promise = new Promise((resolve, reject) => {
      txmap.reverseGeocoder({
        location: {
          latitude: location['latitude'],
          longitude: location['longitude'],
        },
        success: (res: any) => resolve(res.result.address_component),
      });
    });
    return fromPromise<any>(promise);
  }
  public getAddressCode(location: any): Observable<any> {
    return this.getAddress(location).pipe(
        map((response) => {
          let citylist = new CityData().citys;
          let keyword = response.province;
          citylist = this.cityis(keyword, citylist, 'provinceZh');
          keyword = response.city;
          citylist = this.cityis(keyword, citylist, 'leaderZh');
          keyword = response.district;
          citylist = this.cityis(keyword, citylist, 'cityZh');
          return citylist[0].id;
        }),
        catchError(() => '101110108'),
    );
  }
  public getAddressName() {

  }
  cityis(keyword: any, citylist: any, key: string) {
    keyword = keyword.split('');
    let word = '';
    for (const index in keyword) {
      const array = [];
      word = word + keyword[index];
      for (const child in citylist) {
        citylist[child][key].indexOf(word) != -1 ? array.push(citylist[child]) : '';
      }
      array.length > 0 ? citylist = array : '';
    }
    return citylist;
  }
}
