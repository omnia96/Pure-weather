import moment from 'moment';
export class StorageValue<T> {
  public createTime: moment.Moment = moment();
  public expiration: number = 0;
  public data: T;
  constructor(data: T, expiration?: number) {
    if (expiration != null) {
      this.expiration = expiration;
    }
    this.data = data;
  }
}
