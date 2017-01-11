import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { MessagesPage } from '../messages/messages';
import { SettingPage } from '../setting/setting';
import { MessageService } from '../../providers/message-service';
import { UserService } from '../../providers/user-service';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  
  tab1Root: any = HomePage;
  tab2Root: any = MessagesPage;
  tab3Root: any = SettingPage;
  
  messageCount: number = 0;

  constructor(private messageService: MessageService, private userService: UserService) {
    console.log('init tabs');
    this.userService.getCurrentUser().then(userData => {
      console.log(userData);
      if (this.userService.currentUser) {
        // this.messageService.getUnreadMessagesCount(this.userService.currentUser.token).then(data => {
        //   console.log(data);
        // });
        // this.messageService.getUnreadMessagesCount(this.userService.currentUser.token).then(data => {
        //   // console.log(data);
        //   this.messageCount = 5;// data.count;
        // });
      }
      
    });
    
  }
}
