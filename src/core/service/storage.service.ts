import {Storage} from '@/core/models/storage';
import {Observable, of, Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import moment from 'moment';
import {StorageValue} from '@/core/models/storageValue';

export class StorageService<T> {
    storage: Storage<T>;
    constructor(storage: Storage<T>) {
      this.storage = storage;
    }
    public get(): Observable<StorageValue<T>> {
      const option: GetStorageOptions = {};
      const subject = new Subject<StorageValue<T>>();
      if (this.storage) {
        option.key = this.storage.key;
      }
      option.success = (res: { errMsg: string, data: StorageValue<T> }) => subject.next(res.data);
      option.fail = (err: { errMsg: string }) => subject.error(err.errMsg);
      option.complete = () => subject.complete();
      uni.getStorage(option);
      return subject.pipe(map((response) => {
        if (response.expiration === 0) {
          return response;
        } else {
          if (moment().diff(response.createTime, 'seconds') < response.expiration) {
            return response;
          } else {
            this.remove();
            throw new Error(`cache "${this.storage.key}" expired`);
          }
        }
      }));
    }
    public getSync(): undefined | T {
      const storage: StorageValue<T> = uni.getStorageSync(this.storage.key);
      if (storage.expiration === 0) {
        return storage.data;
      } else {
        if (moment().diff(storage.createTime, 'seconds') > 0) {
          return storage.data;
        } else {
          this.remove();
          return undefined;
        }
      }
    }
    public set(): Observable<StorageValue<T>> {
      const subject = new Subject<StorageValue<T>>();
      const option: SetStorageOptions = {};
      if (this.storage) {
        option.key = this.storage.key;
        option.data = this.storage.value;
      }
      option.success = (res: {errMsg: string}) => {
        return subject.next(option.data);
      };
      option.fail = (err: {errMsg: string}) => {
        console.log(err);
        subject.error(err.errMsg);
      };
      option.complete = () => subject.complete();
      uni.setStorage(option);
      return subject.pipe();
    }
    public remove(): Observable<Storage<T>> {
      const option: RemoveStorageOptions = {};
      if (this.storage) option.key = this.storage.key;
      const subject = new Subject<Storage<T>>();
      option.success = (res: {errMsg: string, data: Storage<T>}) => subject.next(res.data);
      option.fail = (err: {errMsg: string}) => subject.error(err.errMsg);
      option.complete = () => subject.complete();
      uni.removeStorage(option);
      return subject.pipe();
    }
}
