import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { ClubService } from '../../providers/club-service';
/*
  Generated class for the ClubDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-club-detail',
  templateUrl: 'club-detail.html'
})
export class ClubDetailPage {

  club: any;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              private clubService: ClubService
              ) 
  {
    this.loadClub(navParams.get('item').id);
  }

  loadClub(clubId) {
    let loading = this.showLoading();

    this.clubService.loadClub(clubId).then(data => {
      loading.dismiss();

      this.club = data;
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
