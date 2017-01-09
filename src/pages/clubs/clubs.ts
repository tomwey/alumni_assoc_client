import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { ClubService } from '../../providers/club-service';
import { ClubDetailPage } from '../club-detail/club-detail';
/*
  Generated class for the Clubs page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-clubs',
  templateUrl: 'clubs.html'
})
export class ClubsPage {

  clubs: Array<any>;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private clubService: ClubService, 
              private loadingCtrl: LoadingController, 
              private toastCtrl: ToastController) {

      this.loadClubs();
  }

  loadClubs() {
    let loading = this.showLoading();

    this.clubService.loadClubs().then(data => {
      loading.dismiss();

      this.clubs = data;
    });
  }

  gotoClubDetail(item) {
    this.navCtrl.push(ClubDetailPage, {item});
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
