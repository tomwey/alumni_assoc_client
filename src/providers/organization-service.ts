import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { ApiService } from './api-service';

/*
  Generated class for the OrganizationService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class OrganizationService {

  constructor(public http: Http, private api: ApiService) {
    
  }

  // 获取校友总会信息
  loadOrganizationAssocInfo() {
    return this.api.get('organizations/assoc', null);
  }

  // 获取校友会列表
  loadOrganizations() {
    return this.api.get('organizations', null);
  }

  // 获取校友总会详情
  loadOrganAssocInfo() {
    return this.api.get('organizations/assoc/body', null);
  }

  // 获取校友组织详情
  loadOrganDetail(id) {
    return this.api.get('organizations/' + id, null);
  }
}
