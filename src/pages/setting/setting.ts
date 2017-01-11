import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { UserService } from '../../providers/user-service';
import { UserProfilePage } from '../user-profile/user-profile';
import { LoginPage } from '../login/login';

/*
  Generated class for the Setting page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html'
})
export class SettingPage {

  user: any = null;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private userService: UserService,
              private modalCtrl: ModalController) 
  {
    
  }

  ionViewWillEnter() {
    this.userService.getCurrentUser().then(data => {
      this.user = data;
    });
  }

  gotoUserProfile() {
    this.userService.getCurrentUser().then(data => {
      if (this.userService.currentUser) {
        this.navCtrl.push(UserProfilePage);
      } else {
        let modal = this.modalCtrl.create(LoginPage);
        modal.onDidDismiss(data => {
          this.userService.getCurrentUser().then(data => {
            this.user = data;
          });
        });
        modal.present();
      }
    })
  }

}
