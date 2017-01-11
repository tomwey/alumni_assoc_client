import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { UserService } from '../../providers/user-service';

/*
  Generated class for the UserProfile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html'
})
export class UserProfilePage {

  user: any = null;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private userService: UserService,
              private alertCtrl: AlertController) 
  {
    this.userService.getCurrentUser().then(data => {
      this.user = data;
    });
  }

  logout() {
    let alert = this.alertCtrl.create({
      title: '您确定吗？',
      // subTitle: '您确定吗？',
      buttons: [
        {
          text: '确定',
          handler: data => {
            this.userService.logout().then(data => {
              this.navCtrl.pop();
            });
          }
        },
        {
          text: '取消',
          handler: data => {

          }
        }
      ]
    });
    alert.present();
  }
}
