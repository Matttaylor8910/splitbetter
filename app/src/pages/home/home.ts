import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

interface Split {
  title: string;
  payer: string;
  participants: string;
  cost: string;
  id?: string;
}

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

  constructor(public navCtrl: NavController, private afs: AngularFirestore) {}

  ionViewWillEnter() {
    // TODO: look up difference between valueChanges and snapshotChanges
    this.splitsCollection = this.afs.collection('splits');  // reference
    this.splits = this.splitsCollection.snapshotChanges().map(changes => {
      return changes.map(c => ({ id: c.payload.doc.id, ...c.payload.doc.data() }));
    });
  }

  addSplit() {
    this.splitsCollection.add(this.newSplit);
  }

  removeSplit(split: Split) {
    this.splitsCollection.doc(split.id).delete();
  }

}
