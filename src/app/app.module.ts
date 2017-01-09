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
import { OrganizationAssocPage } from '../pages/organization-assoc/organization-assoc';
import { OrganizationDetailPage } from '../pages/organization-detail/organization-detail';
import { EventListPage } from '../pages/event-list/event-list';
import { EventDetailPage } from '../pages/event-detail/event-detail';

import { TabsPage } from '../pages/tabs/tabs';

// Providers
import { ApiService } from '../providers/api-service';
import { BannerService } from '../providers/banner-service';
import { OrganizationService } from '../providers/organization-service';
import { ClubService } from '../providers/club-service';
import { DonateService } from '../providers/donate-service';
import { FriendService } from '../providers/friend-service';
import { PracticeBaseService } from '../providers/practice-base-service';

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
    OrganizationAssocPage,
    OrganizationDetailPage,
    EventListPage,
    EventDetailPage,
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
    OrganizationAssocPage,
    OrganizationDetailPage,
    EventListPage,
    EventDetailPage,
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiService,
    BannerService,
    OrganizationService,
    OrganizationService,
    ClubService,
    DonateService,
    FriendService,
    PracticeBaseService,
  ]
})
export class AppModule {}
