import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController, ModalController } from 'ionic-angular';
import { ClubService } from '../../providers/club-service';
import { UserService } from '../../providers/user-service';
import { FriendsPage } from '../friends/friends';
import { LoginPage } from '../login/login';
import { FriendDetailPage } from '../friend-detail/friend-detail';
import { EventListPage } from '../event-list/event-list';
import { EventDetailPage } from '../event-detail/event-detail';
/*
  Generated class for the ClubDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-club-detail',
  templateUrl: 'club-detail.html'
})
export class ClubDetailPage {

  club: any;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              private clubService: ClubService,
              private userService: UserService,
              private modalCtrl: ModalController
              ) 
  {
    this.loadClub(navParams.get('item').id);
  }

  loadClub(clubId) {
    let loading = this.showLoading();

    this.clubService.loadClub(clubId).then(data => {
      loading.dismiss();

      this.club = data;
    });
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
    this.navCtrl.push(EventListPage, { ownerType: 'Club', ownerId: this.club.id });
  }

  gotoEventDetail(event) {
    this.navCtrl.push(EventDetailPage, {event});
  }

  gotoUserList() {
    this.navCtrl.push(FriendsPage, { ownerType: 'Club', ownerId: this.club.id });
  }

  showLoading() {
    let loading = this.loadingCtrl.create({
      spinner: 'ios',
    });

    loading.present();
    return loading;
  }

  showToast(msg: string) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000,
    });
    toast.present();
    return toast;
  }

}
