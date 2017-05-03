import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Talks } from './talks';

@NgModule({
  declarations: [
    Talks,
  ],
  imports: [
    IonicPageModule.forChild(Talks),
  ],
  exports: [
    Talks
  ]
})
export class TalksModule {}
