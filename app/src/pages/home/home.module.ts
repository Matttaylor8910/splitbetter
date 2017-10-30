import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import { WelcomeModal } from './welcome/welcome';
import { NewSplitModal } from './new-split/new-split';

@NgModule({
  declarations: [
    HomePage,
    WelcomeModal,
    NewSplitModal
  ],
  imports: [
    IonicPageModule.forChild(HomePage)
  ],
  entryComponents: [
    WelcomeModal,
    NewSplitModal
  ]
})
export class HomePageModule {}
