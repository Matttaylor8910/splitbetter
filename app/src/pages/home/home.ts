import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { WelcomeModal } from './welcome/welcome';

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

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    private afs: AngularFirestore,
    private storage: Storage
  ) {}

  ionViewWillEnter() {
    // ask the user who they are if they aren't set up
    this.storage.get('user').then((val) => {
      if (!val) {
        this.presentWelcomeModal();
      }
    });

    // TODO: look up difference between valueChanges and snapshotChanges
    this.splitsCollection = this.afs.collection('splits');  // reference
    this.splits = this.splitsCollection.snapshotChanges().map(changes => {
      return changes.map(c => ({ id: c.payload.doc.id, ...c.payload.doc.data() }));
    });
  }

  presentWelcomeModal() {
    const welcomeModal = this.modalCtrl.create(WelcomeModal);
    welcomeModal.onDidDismiss(data => {
      this.storage.set('user', data);
    });
    welcomeModal.present();
  }

  addSplit() {
    this.splitsCollection.add(this.newSplit);
  }

  removeSplit(split: Split) {
    this.splitsCollection.doc(split.id).delete();
  }

  clear() {
    this.storage.clear();
  }

}
