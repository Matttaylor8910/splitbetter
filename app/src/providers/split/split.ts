import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from "angularfire2/firestore";
import {Observable} from "rxjs/Observable";

@Injectable()
export class SplitProvider {

  splitsCollection: AngularFirestoreCollection<Split>;
  splits: Observable<any[]>;
  hasSplits: boolean;

  constructor(private afs: AngularFirestore) {
    this.splitsCollection = this.afs.collection('splits');  // reference
    this.splits = this.splitsCollection.snapshotChanges().map(changes => {
      this.hasSplits = changes.length > 0;
      return changes.map(c => ({id: c.payload.doc.id, ...c.payload.doc.data()}));
    });
  }

  addSplit(newSplit: Split) {
    return this.splitsCollection.add(newSplit);
  }

  removeSplit(split: Split) {
    return this.splitsCollection.doc(split.id).delete();
  }

  getSplit(id: string) {
    let ref =  this.afs.doc('splits/' + id);
    return ref.valueChanges();
  }
}

export interface Split {
  title: string;
  currency: Currency;
  participants: Participant[];
  id?: string;
}

export interface Currency {
  name: string;
  value: number;
}

export interface Participant {
  name: string;
}
