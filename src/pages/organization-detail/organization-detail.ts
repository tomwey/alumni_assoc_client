import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { OrganizationService } from '../../providers/organization-service';
import { UserService } from '../../providers/user-service';

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
              private userService: UserService) 
  {
    this.loadOrganization(this.navParams.get('item').id);
  }

  loadOrganization(id) {
    this.organService.loadOrganDetail(id).then(data => {
      this.organization = data;
      console.log(data);
    });
  }

  doAdd() {
    if (this.userService.currentUser) {
      // 加入校友会
    } else {
      // 跳转到登录页面
    }
  }

  gotoUserDetail(user) {

  }

  openChat(user) {

  }

  gotoEventList() {

  }

  gotoEventDetail(event) {

  }

  gotoUserList() {

  }

}
