import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import { WelcomeModal } from './welcome/welcome';
import { NewSplitModal } from './new-split/new-split';
import { SplitDashboardPage } from '../split-dashboard/split-dashboard'

@NgModule({
  declarations: [
    HomePage,
    WelcomeModal,
    NewSplitModal,
    SplitDashboardPage
  ],
  imports: [
    IonicPageModule.forChild(HomePage)
  ],
  entryComponents: [
    WelcomeModal,
    NewSplitModal,
    SplitDashboardPage
  ]
})
export class HomePageModule {}
