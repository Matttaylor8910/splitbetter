import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import { WelcomeModal } from './welcome/welcome'

@NgModule({
  declarations: [
    HomePage, WelcomeModal
  ],
  imports: [
    IonicPageModule.forChild(HomePage)
  ],
  entryComponents: [
    WelcomeModal
  ]
})
export class HomePageModule {}
