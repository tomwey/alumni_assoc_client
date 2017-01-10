import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { EventService } from '../../providers/event-service';

/*
  Generated class for the EventDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-event-detail',
  templateUrl: 'event-detail.html'
})
export class EventDetailPage {

  event: any = null;
  
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private loadingCtrl: LoadingController, 
              private toastCtrl: ToastController,
              private eventService: EventService) 
  {
    this.loadEvent(navParams.get('event').id);
  }

  loadEvent(eventId) {
    let loading = this.showLoading();
    this.eventService.loadEvent(eventId).then(data => {
      loading.dismiss();
      console.log(data);

      this.event = data;
    })
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
