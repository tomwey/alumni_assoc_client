import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { UserService } from '../../providers/user-service';
/*
  Generated class for the FriendDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-friend-detail',
  templateUrl: 'friend-detail.html'
})
export class FriendDetailPage {
  user: any = {};
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              private userService: UserService) 
  {
    this.loadUserInfo();
  }

  loadUserInfo() {
    let loading = this.showLoading();

    this.userService.loadUserInfo(this.navParams.get('uid'), this.navParams.get('token')).then(data => {
      this.user = data;
      console.log(data);
      loading.dismiss();
    });
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
