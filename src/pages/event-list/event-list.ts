import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { EventService } from '../../providers/event-service';
import { EventDetailPage } from '../event-detail/event-detail';

/*
  Generated class for the EventList page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-event-list',
  templateUrl: 'event-list.html'
})
export class EventListPage {

  ownerType: string = null;
  ownerId: number = null;
  events: Array<any> = [];
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private loadingCtrl: LoadingController, 
              private toastCtrl: ToastController,
              private eventService: EventService) 
  {
    this.ownerType = navParams.get('ownerType');
    this.ownerId = navParams.get('ownerId');

    this.loadEvents();
  }

  loadEvents() {
    let loading = this.showLoading();

    this.eventService.loadEvents(this.ownerType, this.ownerId, null, null).then(data => {
      loading.dismiss();

      this.events = data;
      console.log(data);
    });
  }

  gotoEventDetail(event) {
    this.navCtrl.push(EventDetailPage, {event});
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
