import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { WelcomeModal } from './welcome/welcome';
import { NewSplitModal } from './new-split/new-split';
import { SplitDashboardPage } from '../split-dashboard/split-dashboard';

interface Split {
  title: string;
  payer: string;
  participants: string;
  cost: string;
  id?: string;
}

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

  splitsCollection: AngularFirestoreCollection<Split>;
  // TODO: strongly type
  splits: Observable<any[]>;
  hasGroups: boolean;
  user: any;

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    private afs: AngularFirestore,
    private storage: Storage
  ) {}

  ionViewWillEnter() {
    // ask the user who they are if they aren't set up
    this.storage.get('user').then((user) => {
      if (!user) {
        this.presentWelcomeModal();
      } else {
        this.user = user;
      }
    });

    // TODO: look up difference between valueChanges and snapshotChanges
    this.splitsCollection = this.afs.collection('splits');  // reference
    this.splits = this.splitsCollection.snapshotChanges().map(changes => {
      this.hasGroups = changes.length > 0;
      return changes.map(c => ({ id: c.payload.doc.id, ...c.payload.doc.data() }));
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

  addSplit() {
    this.splitsCollection.add(this.newSplit);
  }

  removeSplit(split: Split) {
    this.splitsCollection.doc(split.id).delete();
  }

  clear() {
    this.storage.clear();
    this.presentWelcomeModal();
  }

}
