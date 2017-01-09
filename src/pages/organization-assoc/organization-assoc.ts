import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { OrganizationService } from '../../providers/organization-service';
import { EventListPage } from '../event-list/event-list';
import { EventDetailPage } from '../event-detail/event-detail';

/*
  Generated class for the OrganizationAssoc page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-organization-assoc',
  templateUrl: 'organization-assoc.html'
})
export class OrganizationAssocPage {

  organAssocInfo?: any;

  // 滚动banner配置
  imagesSlideOptions = {
    pager: true,
    autoplay: 3000,
    loop: true,
    autoplayDisableOnInteraction: false,
  };

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private organService: OrganizationService,
              private loadingCtrl: LoadingController,
              private toastCtrl: ToastController) 
  {
    this.organAssocInfo = null;
    this.loadOrganAssocDetail();
  }

  loadOrganAssocDetail() {
    let loading = this.showLoading();

    this.organService.loadOrganAssocInfo().then(data => {
      console.log(data);
      this.organAssocInfo = data;

      loading.dismiss();

    }, error => {
      loading.dismiss();

      this.showToast(error);
    });
  }

  gotoEventDetail(event) {
    this.navCtrl.push(EventDetailPage, { event });
  }

  moreEvents() {
    // console.log(123);
    this.navCtrl.push(EventListPage);
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
