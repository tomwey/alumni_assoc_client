import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { MessagesPage } from '../messages/messages';
import { SettingPage } from '../setting/setting';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  
  tab1Root: any = HomePage;
  tab2Root: any = MessagesPage;
  tab3Root: any = SettingPage;
  
  constructor() {

  }
}
