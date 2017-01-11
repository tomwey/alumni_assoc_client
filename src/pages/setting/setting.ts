import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserService } from '../../providers/user-service';

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
              private userService: UserService) 
  {
  }

  ionViewWillEnter() {
    this.user = this.userService.currentUser;
  }


}
