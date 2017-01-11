import { Injectable } from '@angular/core';
import { ApiService } from './api-service';

/*
  Generated class for the MessageService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class MessageService {

  constructor(private api: ApiService) {
    
  }

  // 获取未读消息数
  getUnreadMessagesCount(token: string) {
    return this.api.get('messages/unread_count', { token: token });
  }
  
  // 获取所有的消息会话
  getMessageSessions(token: string, pageNo: number, pageSize: number = 20) {
    let params = {};
    if (token) {
      params['token'] = token;
    }

    if (pageNo) {
      params['page'] = pageNo;
      if (pageSize) {
        params['size'] = pageSize;
      }
    }
    return this.api.get('messages/sessions', params);
  }
  // 获取某个会话下面的消息
  getMessages(token: string, to: string, needSort: number, pageNo: number, pageSize: number = 20) {
    let params = {};
    if (token) {
      params['token'] = token;
    }

    if (to) {
      params['to'] = to;
    }

    if (needSort) {
      params['need_sort'] = needSort;
    }

    if (pageNo) {
      params['page'] = pageNo;
      if (pageSize) {
        params['size'] = pageSize;
      }
    }
    return this.api.get('messages', params);
  }
  // 发消息
  sendMessage(token: string, to: string, content: string) {
    return this.api.post('messages/send', { token: token, content: content, to: to });
  }
}
