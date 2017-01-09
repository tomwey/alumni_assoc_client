import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { OrganizationService } from '../../providers/organization-service';

import { OrganizationAssocPage } from '../organization-assoc/organization-assoc';
import { OrganizationDetailPage } from '../organization-detail/organization-detail';

@Component({
  selector: 'page-organizations',
  templateUrl: 'organizations.html'
})
export class OrganizationsPage {

  organizations?: any;
  organizationAssoc?: any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private organService: OrganizationService,
              private loadingCtrl: LoadingController,
              private toastCtrl: ToastController) {
      
      
      this.organService.loadOrganizationAssocInfo().then(data => {
        // console.log(data);
        this.organizationAssoc = data;
      }, error => {
        // console.log(error);
      });

      this.loadOrganizations();
      
  }

  loadOrganizations() {
    let loading = this.showLoading();

    this.organService.loadOrganizations().then(data => {
      console.log(data);
      this.organizations = data;

      loading.dismiss();
    }, error => {
      console.log(error);
      loading.dismiss();

      this.showToast(error);
    });
  }

  gotoOrganAssoc() {
    this.navCtrl.push(OrganizationAssocPage);
  }

  gotoOrganDetail(item) {
    this.navCtrl.push(OrganizationDetailPage, {item});
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
