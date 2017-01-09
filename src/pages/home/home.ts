import { Component, ViewChild } from '@angular/core';

import { NavController, LoadingController, ToastController, Slides } from 'ionic-angular';

import { BannerService } from '../../providers/banner-service';

import { OrganizationsPage } from '../organizations/organizations';
import { FriendsPage } from '../friends/friends';
import { ClubsPage } from '../clubs/clubs';
import { PracticeBasePage } from '../practice-base/practice-base';
import { DonatePage } from '../donate/donate';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  banners?: any;
  sections: any;

  @ViewChild('banner') banner: Slides;

  // 滚动banner配置
  bannersSlideOptions = {
    pager: true,
    autoplay: 3000,
    loop: true,
    autoplayDisableOnInteraction: false,
  };

  constructor(public navCtrl: NavController,
              private bannerService: BannerService,
              private loadingCtrl: LoadingController,
              private toastCtrl: ToastController) {
      this.loadBanners();

      this.sections = [{
        id: 1,
        page: OrganizationsPage,
        icon: 'assets/img/img_org.png',
      }, {
        id: 2,
        page: FriendsPage,
        icon: 'assets/img/img_alb.png',
      }, {
        id: 3,
        page: ClubsPage,
        icon: 'assets/img/img_club.png',
      }, {
        id: 4,
        page: PracticeBasePage,
        icon: 'assets/img/img_comp.png',
      }, {
        id: 5,
        page: DonatePage,
        icon: 'assets/img/img_don.png',
      }];
  }

  private loadBanners() {
    let loading = this.showLoading();

    this.bannerService.loadBanners().then(data => {
      this.banners = data;

      loading.dismiss();
    }, error => {
      loading.dismiss();

      this.showToast(error);
    });
  }

  private forwardTo(item) {
    console.log(item);

    this.navCtrl.push(item.page);
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
