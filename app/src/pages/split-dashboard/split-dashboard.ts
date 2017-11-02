import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

/**
 * Generated class for the SplitDashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-split-dashboard',
  templateUrl: 'split-dashboard.html',
})
export class SplitDashboardPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  id: string;

  ionViewDidLoad() {
    this.id = this.navParams.get('id');
  }

}
