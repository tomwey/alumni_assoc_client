import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController, ModalController } from 'ionic-angular';
import { OrganizationService } from '../../providers/organization-service';
import { UserService } from '../../providers/user-service';
import { FriendsPage } from '../friends/friends';
import { LoginPage } from '../login/login';
import { FriendDetailPage } from '../friend-detail/friend-detail';
import { EventListPage } from '../event-list/event-list';
import { EventDetailPage } from '../event-detail/event-detail';

/*
  Generated class for the OrganizationDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-organization-detail',
  templateUrl: 'organization-detail.html'
})
export class OrganizationDetailPage {

    organization?: any;

    constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private organService: OrganizationService,
              private loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              private userService: UserService,
              private modalCtrl: ModalController) 
  {
    // this.loadOrganization(this.navParams.get('item').id);
  }

  ionViewDidLoad() {
    // setTimeout(function() {
      // this.loadOrganization(this.navParams.get('item').id);
    // }, 0);
  }

  ionViewWillEnter() {
    this.loadOrganization(this.navParams.get('item').id);
  }

  loadOrganization(id) {
    this.organService.loadOrganDetail(id).then(data => {
      this.organization = data;
      console.log(data);
    });
  }

  doAdd() {
    if (this.userService.currentUser && this.userService.currentUser.token) {
      // 加入
    } else {
      // 登录
      let modal = this.modalCtrl.create(LoginPage);
      modal.present();
    }
  }

  gotoUserDetail(user) {
    if (this.userService.currentUser && this.userService.currentUser.token) {
      this.navCtrl.push(FriendDetailPage, {uid: user.uid, token: this.userService.currentUser.token});
    } else {
      // 登录
      let modal = this.modalCtrl.create(LoginPage);
      modal.present();
    }
  }

  openChat(user) {

  }

  gotoEventList() {
    this.navCtrl.push(EventListPage, { ownerType: 'Organization', ownerId: this.organization.id });
  }

  gotoEventDetail(event) {
    this.navCtrl.push(EventDetailPage, {event});
  }

  gotoUserList() {
    this.navCtrl.push(FriendsPage, { ownerType: 'Organization', ownerId: this.organization.id });
  }

}
