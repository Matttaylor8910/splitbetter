import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {SplitDashboardPage} from './split-dashboard';

@NgModule({
  declarations: [
    SplitDashboardPage,
  ],
  imports: [
    IonicPageModule.forChild(SplitDashboardPage),
  ],
})
export class SplitDashboardPageModule {
}
