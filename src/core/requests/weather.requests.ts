import {Request} from '@/core/unit/Request';
import {Observable} from 'rxjs';
import {apiKey} from '@/core/config/app/app.config';
/**
 * 实时天气接口
 * @param {string} cityId
 * @return {Observable<any>}
 */
export function realTimeWeather(cityId: string): Observable<any> {
  const data = Object.assign({version: 'v61', cityid: cityId}, apiKey);
  return new Request().get('https://www.tianqiapi.com/api/', data);
}

/**
 * 一周天气
 * @param {string} cityId
 * @return {Observable<any>}
 */
export function weekWeather(cityId: string): Observable<any> {
  const data = Object.assign({version: 'v9', cityid: cityId}, apiKey);
  return new Request().get('https://www.tianqiapi.com/api/', data);
}
