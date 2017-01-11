import { Injectable } from '@angular/core';
import { ApiService } from './api-service';
import { StorageService } from './storage-service';

/*
  Generated class for the UserService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UserService {

  currentUser: any;
  constructor(private api: ApiService, 
              private storage: StorageService) 
  {
    this.storage.getObject('logined.user').then(data => {
      this.currentUser = JSON.parse(data);
    }, error => {
      this.currentUser = null;
    });
  }
  
  getCurrentUser() {
    return this.storage.getObject('logined.user').then(data => {
      this.currentUser = JSON.parse(data);
      return Promise.resolve(this.currentUser);
    }, error => {
      this.currentUser = null;
      return Promise.reject(error);
    });
  }

  loadUsers(keyword: string, 
            ownerType: string, 
            ownerId: number, 
            pageNo: number, 
            pageSize: number) {
    let params = {};
    if (keyword != null && keyword != '') {
      params['q'] = keyword;
    }

    if (this.currentUser && this.currentUser.token) {
      params['token'] = this.currentUser.token;
    }

    if (ownerType && ownerId) {
      params['owner_type'] = ownerType;
      params['owner_id']   = ownerId;
    }

    if (pageNo) {
      params['page'] = pageNo;
      params['size'] = pageSize || 15;
    }
    
    return this.api.get('users', params);
  }

  loadUserInfo(uid, token) {
    return this.api.get('users/'+ uid, { token: token });
  }

  login(user) {
    return this.api.post('account/login', { mobile: user.mobile, password: user.password }).then(data => {
      this.currentUser = data;
      this.storage.saveObject('logined.user', data);
      return Promise.resolve(data);
    }, error => {
      return Promise.reject(error);
    }); 
  } 

  logout() {
    this.currentUser = null;
    return this.storage.removeObject('logined.user');
  }

  signup() {

  }

}
