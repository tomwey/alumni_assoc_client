import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, LoadingController, ToastController } from 'ionic-angular';
import { UserService } from '../../providers/user-service';
import { MessageService } from '../../providers/message-service';
import { LoginPage } from '../login/login';
import * as moment from 'moment';

/*
  Generated class for the Messages page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html'
})
export class MessagesPage {

  messages: Array<any> = [];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private userService: UserService,
              private messageService: MessageService,
              private modalCtrl: ModalController,
              private loadingCtrl: LoadingController,
              private toastCtrl: ToastController) 
  {
    // console.log(this.userService.currentUser);
    // this.userService.getCurrentUser().then(data => {
    //   console.log(data);
    //   console.log(this.userService.currentUser);
    // });
  }
  
  ionViewWillEnter() {
    this.userService.getCurrentUser().then(data => {
      if (this.userService.currentUser) {
        let loading = this.showLoading();
        // 加载消息
        this.messageService.getMessageSessions(this.userService.currentUser.token, null, null).then(data => {
          loading.dismiss();

          this.messages = data;
          console.log(data);
        }, error => {
          loading.dismiss();

          this.showToast(error);
        });
      } else {
        // 跳转到登录页面
        let modal = this.modalCtrl.create(LoginPage);
        modal.present();
      }
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
