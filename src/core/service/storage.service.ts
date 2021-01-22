import {Storage} from '@/core/models/storage';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import moment from 'moment';
import {StorageValue} from '@/core/models/storageValue';
import GetStorageOptions = UniApp.GetStorageOptions;
import SetStorageOptions = UniApp.SetStorageOptions;
import {fromPromise} from "rxjs/internal-compatibility";
import RemoveStorageOptions = UniApp.RemoveStorageOptions;

export class StorageService<T> {
    storage: Storage<T>;
    constructor(storage: Storage<T>) {
      this.storage = storage;
    }
    public get(): Observable<StorageValue<T>> {
      const option: GetStorageOptions = {key: this.storage.key};
      return fromPromise(new Promise<StorageValue<T>>((resolve, reject) => {
        option.success = (res: { errMsg: string, data: StorageValue<T> }) => resolve(res.data);
        option.fail = (err: { errMsg: string }) => reject(err.errMsg);
        uni.getStorage(option)
      })).pipe(map((response) => {
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
      const option: SetStorageOptions = {key: this.storage.key, data: this.storage.value};
      return fromPromise(new Promise((resolve, reject) => {
        option.success = (result) => resolve(option.data);
        option.fail = (result) => reject(result);
        uni.setStorage(option);
      }));
    }
    public remove(): Observable<any> {
      const option: RemoveStorageOptions = {key: this.storage.key};
      return fromPromise(new Promise<any>((resolve, reject) => {
        option.success = (res) => resolve(res);
        option.fail = (err: {errMsg: string}) => reject(err.errMsg);
      }))
    }
}
