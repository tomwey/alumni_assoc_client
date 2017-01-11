import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

/*
  Generated class for the StorageService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class StorageService {

  constructor(private storage: Storage) {
    
  }

  saveObject(key: string, obj: any) {
    this.storage.set(key, JSON.stringify(obj));
  }

  removeObject(key: string) {
    return this.storage.remove(key);
  }
  
  getObject(key: string): Promise<any> {
    return this.storage.get(key);
  }

}
