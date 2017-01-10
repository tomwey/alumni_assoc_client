import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController, ModalController } from 'ionic-angular';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import { UserService } from '../../providers/user-service';
import { FriendDetailPage } from '../friend-detail/friend-detail';
import { LoginPage } from '../login/login';

/*
  Generated class for the Friends page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-friends',
  templateUrl: 'friends.html'
})
export class FriendsPage {

  searchTerm: string = '';
  searchControl: FormControl;
  users: Array<any>;
  searching: boolean = false;

  isOpenChat: boolean = false;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private userService: UserService,
              private loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              private modalCtrl: ModalController) 
  {
    this.searchControl = new FormControl();

    this.loadUsers();
  }

  ionViewDidLoad() {
    this.searchControl.valueChanges.debounceTime(200).subscribe(search => {
      // this.searching = false;
      this.loadUsers();
    });
  }

  onSearchInput() {
    this.searching = true;
  }

  loadUsers() {
    let loading;
    if (!this.searching) {
      loading = this.showLoading();
    }

    this.userService.loadUsers(this.searchTerm, null, null, null, null).then(data => {
      this.searching = false;

      this.users = data;
      // console.log(data);
      if (loading)
        loading.dismiss();
    });
  }

  gotoFriendDetail(user) {
    // console.log(2);
    if (this.isOpenChat) return;

    if (this.userService.currentUser && this.userService.currentUser.token) {
      this.navCtrl.push(FriendDetailPage, {uid: user.uid, token: this.userService.currentUser.token});
    } else {
      // 登录
      let modal = this.modalCtrl.create(LoginPage);
      modal.present();
    }
  }

  openChat(user) {
    // console.log(1);
    this.isOpenChat = true;

    if (this.userService.currentUser && this.userService.currentUser.token) {
      // this.navCtrl.push(FriendDetailPage, {uid: user.uid, token: this.userService.currentUser.token});
    } else {
      // 登录
      let modal = this.modalCtrl.create(LoginPage);
      modal.onDidDismiss(data => {
        this.isOpenChat = false;
      });
      modal.present();
    }
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
