import { Injectable } from '@angular/core';
import { ApiService } from './api-service';
import { UserService } from './user-service';

/*
  Generated class for the EventService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class EventService {

  constructor(private api: ApiService, private userService: UserService) {
    
  }

  loadEvents(ownerType: string, ownerId: number, pageNo: number, pageSize: number = 20) {
    let params = {};
    if (ownerType) {
      params['owner_type'] = ownerType;
    }

    if (ownerId) {
      params['owner_id'] = ownerId;
    }

    if (pageNo) {
      params['page'] = pageNo;
    }

    if (pageSize) {
      params['size'] = pageSize;
    }

    return this.api.get('events', params);
  }

  loadEvent(eventId) {
    let params = {};
    if (this.userService.currentUser) {
      params['token'] = this.userService.currentUser.token;
    }
    return this.api.get('events/' + eventId, params);
  }
}
