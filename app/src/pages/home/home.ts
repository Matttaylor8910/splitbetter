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
  splits: Observable<Split[]>;

  constructor(public navCtrl: NavController, private afs: AngularFirestore) {}

  ionViewWillEnter() {
    this.splitsCollection = this.afs.collection('splits');  // reference
    this.splits = this.splitsCollection.valueChanges();       // observable of notes data
  }

  addSplit() {
    this.splitsCollection.add(this.newSplit);
  }

  removeSplit(split: Split) {
    console.log(split);
  }

}
