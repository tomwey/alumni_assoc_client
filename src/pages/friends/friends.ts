import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';

/*
  Generated class for the Friends page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-friends',
  templateUrl: 'friends.html'
})
export class FriendsPage {

  searchTerm: string = '';
  searchControl: FormControl;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.searchControl = new FormControl();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FriendsPage');
  }

}
