import {Observable, Subject} from 'rxjs';
import {map} from 'rxjs/operators';

export class Request {
  public get(url: string, data?: any): Observable<any> {
    return this.request(url, data, 'GET');
  }

  public post(url: string, data?: any): Observable<any> {
    return this.request(url, data, 'POST');
  }

  private request(
      url: string,
      data: any,
      method: 'OPTIONS'|'GET'|'HEAD'|'POST'|'PUT'|'DELETE'|'TRACE'|'CONNECT'| undefined,
  ): Observable<any> {
    const subject = new Subject<any>();
    uni.request({
      url: url,
      data: data,
      method: method,
      success: (response) => {
        subject.next(response);
      },
      fail: (error) => {
        subject.error(error);
      },
    });
    return subject.pipe(
        map<any, any>((response) => Request.responseInterceptor(response)),
    );
  }
  private static responseInterceptor(response: any) {
    if (response.statusCode.toString().indexOf('2') === 0) {
      return response.data;
    } else {
      uni.showToast({icon: 'none', title: response.err});
      throw new Error(response.errMsg);
    }
  }
}
