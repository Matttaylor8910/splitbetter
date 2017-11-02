import {Component} from '@angular/core';
import {IonicPage, NavController, ModalController} from 'ionic-angular';
import {Storage} from "@ionic/storage";
import 'rxjs/add/operator/map';
import {WelcomeModal} from './welcome/welcome';
import {NewSplitModal} from './new-split/new-split';
import {SplitDashboardPage} from '../split-dashboard/split-dashboard';
import {Split, SplitProvider} from "../../providers/split/split";

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  newSplit = {
    title: '',
    payer: '',
    participants: '',
    cost: ''
  };

  user: any;

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    private storage: Storage,
    private splitProvider: SplitProvider)
  {}

  removeSplit = this.splitProvider.removeSplit;

  ionViewWillEnter() {
    // ask the user who they are if they aren't set up
    this.storage.get('user').then((user) => {
      if (!user) {
        this.presentWelcomeModal();
      } else {
        this.user = user;
      }
    });
  }

  presentWelcomeModal() {
    const welcomeModal = this.modalCtrl.create(WelcomeModal);
    welcomeModal.onDidDismiss(data => {
      this.storage.set('user', data);
      this.user = data;
    });
    welcomeModal.present();
  }

  navToSplit(split: Split) {
    this.navCtrl.push(SplitDashboardPage, {
      id: split.id
    });
  }

  createNewSplit() {
    this.modalCtrl.create(NewSplitModal).present();
  }

  clear() {
    this.storage.clear();
    this.presentWelcomeModal();
  }

}
