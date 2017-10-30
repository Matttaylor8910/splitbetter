import {Component} from '@angular/core';
import {ViewController} from 'ionic-angular';
import {AngularFirestore, AngularFirestoreCollection} from "angularfire2/firestore";

interface Split {
  title: string;
  currency: Currency;
  participants: Participant[];
}

interface Currency {
  name: string;
  value: number;
}

interface Participant {
  name: string;
}

@Component({
  selector: 'modal-new-split',
  templateUrl: 'new-split.html',
})
export class NewSplitModal {

  split: Split;
  splitsCollection: AngularFirestoreCollection<Split>;

  constructor(
    public viewCtrl: ViewController,
    private afs: AngularFirestore
  ) {
    this.split = {
      title: '',
      currency: this.supportedCurrencies[0],
      participants: [{name: ''}]
    };

    this.splitsCollection = this.afs.collection('splits');
  }

  supportedCurrencies = [
    {name: 'USD', value: 1.0},
    {name: 'EUR', value: 1.1},
    {name: 'JPY', value: 112}
  ];

  changed(text: string) {
    if (text.length > 0) {
      console.log('add field')
      this.split.participants = this.filterParticipants(this.split.participants);
      this.split.participants.push({name: ''});
    } else {
      console.log('do nothing')
    }
  }

  createSplit() {
    this.split.participants = this.filterParticipants(this.split.participants);
    console.log(this.split);
    this.splitsCollection.add(this.split);
    this.dismiss();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  private filterParticipants(participants: Participant[]) {
    return participants.filter(participant => participant.name.length > 0);
  }
}
