import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ApiService } from './api-service';

/*
  Generated class for the ClubService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ClubService {

  constructor(public http: Http, private api: ApiService) {
    // console.log('Hello ClubService Provider');
  }

  loadClubs() {
    return this.api.get('clubs', null);
  }

  loadClub(clubId) {
    return this.api.get('clubs/' + clubId, null);
  }

}
