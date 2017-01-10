import { Component } from '@angular/core';
import { NavController, 
  NavParams, 
  ViewController, 
  LoadingController, 
  ToastController } from 'ionic-angular';
import { UserService } from '../../providers/user-service';

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  user: any = { mobile: '', password: '' };
  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              private viewCtrl: ViewController,
              private toastCtrl: ToastController,
              private loadingCtrl: LoadingController,
              private userService: UserService) {}

  close() {
    this.viewCtrl.dismiss();
  }

  doLogin() {
    if (this.user.mobile == '') {
      this.showToast('手机号不能为空');
      return;
    }

    if (this.user.password == '') {
      this.showToast('密码不能为空');
      return;
    }

    let loading = this.showLoading();
    this.userService.login(this.user).then(data => {
      loading.dismiss();
      console.log(data);
      setTimeout(function() {
        this.close();
      }, 50);
    }, error => {
      loading.dismiss();

      this.showToast(error);
    });
  }

  forgetPassword() {

  }

  signup() {

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
