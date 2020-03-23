import { Storage } from './storage';

export class StorageService<T> {
    storage: Storage<T>|undefined;
    constructor(storage: Storage<T>) {
        this.storage = storage;
    }
    get() {
        const option: GetStorageOptions = {};
        if (this.storage) {
            option.key = this.storage.key
        }
        return new Promise(
            (resolve: (value?: T | PromiseLike<T> | undefined) => void,reject: (reason?: any) => void) =>{
                option.success = (res: {errMsg: string, data: T}) => {
                    resolve(res.data);
                }
                option.fail = (err: {errMsg: string}) => {
                    console.log(err.errMsg);
                    reject();
                }
                uni.getStorage(option);
            }
        );
    }
    set() {
        const option: SetStorageOptions = {};
        if (this.storage) {
            option.key = this.storage.key,
            option.data = this.storage.value
        }
        return new Promise(
            (resolve: (value?: T | PromiseLike<T> | undefined) => void,reject: (reason?: any) => void) => {
                option.success = (res: {errMsg: string, data: T}) => {
                    resolve(res.data);
                }
                option.fail = (err: {errMsg: string}) => {
                    console.log(err.errMsg);
                    reject();
                }
                uni.setStorage(option);
            }
        );
    }
    remove() {
        const option: RemoveStorageOptions = {};
        if (this.storage) {
            option.key = this.storage.key
        }
        return new Promise(
            (resolve: (value?: T | PromiseLike<T> | undefined) => void,reject: (reason?: any) => void) => {
                option.success = (res: {errMsg: string, data: T}) => {
                    resolve(res.data);
                }
                option.fail = (err: {errMsg: string}) => {
                    console.log(err.errMsg);
                    reject();
                }
                uni.removeStorage(option);
            }
        );
    }
}