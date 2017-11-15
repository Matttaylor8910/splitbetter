import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Split, SplitProvider} from "../../providers/split/split";

@IonicPage()
@Component({
  selector: 'page-split-dashboard',
  templateUrl: 'split-dashboard.html',
})
export class SplitDashboardPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private splitProvider: SplitProvider) {
  }

  split: any;
  id: string;

  ionViewDidLoad() {
    this.id = this.navParams.get('id');
    this.split = this.splitProvider.getSplit(this.id);
  }

}
