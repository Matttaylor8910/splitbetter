import {Component} from '@angular/core';
import {ViewController} from 'ionic-angular';
import {Participant, Split, SplitProvider} from "../../../providers/split/split";

@Component({
  selector: 'modal-new-split',
  templateUrl: 'new-split.html',
})
export class NewSplitModal {

  split: Split;

  constructor(public viewCtrl: ViewController, private splitProvider: SplitProvider) {
    this.split = {
      title: '',
      currency: this.supportedCurrencies[0],
      participants: [{name: ''}]
    };
  }

  supportedCurrencies = [
    {name: 'USD', value: 1.0},
    {name: 'EUR', value: 1.1},
    {name: 'JPY', value: 112}
  ];

  changed(text: string) {
    if (text.length > 0) {
      this.split.participants = this.filterParticipants(this.split.participants);
      this.split.participants.push({name: ''});
    }
  }

  createSplit() {
    this.split.participants = this.filterParticipants(this.split.participants);
    this.splitProvider.addSplit(this.split);
    this.dismiss();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  private filterParticipants(participants: Participant[]) {
    return participants.filter(participant => participant.name.length > 0);
  }
}
