import {Component} from '@angular/core';
import {ViewController} from 'ionic-angular';

@Component({
  selector: 'modal-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomeModal {

  user;

  constructor(public viewCtrl: ViewController) {
    this.user = {};
  }

  getStarted(user: any) {
    this.viewCtrl.dismiss(user);
  }
}
