import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { AlumniAssocApp } from './app.component';

// Pages
import { MessagesPage } from '../pages/messages/messages';
import { SettingPage } from '../pages/setting/setting';
import { HomePage } from '../pages/home/home';
import { OrganizationsPage } from '../pages/organizations/organizations';
import { FriendsPage } from '../pages/friends/friends';
import { ClubsPage } from '../pages/clubs/clubs';
import { PracticeBasePage } from '../pages/practice-base/practice-base';
import { DonatePage } from '../pages/donate/donate';

import { TabsPage } from '../pages/tabs/tabs';

// Providers
import { ApiService } from '../providers/api-service';
import { BannerService } from '../providers/banner-service';

@NgModule({
  declarations: [
    AlumniAssocApp,
    MessagesPage,
    SettingPage,
    HomePage,
    TabsPage,
    OrganizationsPage,
    FriendsPage,
    ClubsPage,
    PracticeBasePage,
    DonatePage,   
  ],
  imports: [
    IonicModule.forRoot(AlumniAssocApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    AlumniAssocApp,
    MessagesPage,
    SettingPage,
    HomePage,
    TabsPage,
    OrganizationsPage,
    FriendsPage,
    ClubsPage,
    PracticeBasePage,
    DonatePage, 
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiService,
    BannerService,
  ]
})
export class AppModule {}
