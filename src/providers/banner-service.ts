import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ApiService } from './api-service';

/*
  Generated class for the BannerService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class BannerService {

  constructor(public http: Http, 
              private api: ApiService) {
    // console.log('Hello BannerService Provider');
    // this.api.get('banners', null).then(data => {
    //   console.log(data);
    // }, error => {
    //   console.log(error);
    // });
  }

  loadBanners() {
    return this.api.get('banners', null);
  }

}
