import {StorageValue} from '@/core/models/storageValue';

export class Storage<T> {
  public key: string = '';
  public value: StorageValue<T>;

  constructor(key: string, value?: any) {
    this.key = key;
    this.value = value;
  }
}
