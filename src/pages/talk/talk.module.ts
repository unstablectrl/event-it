import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Talk } from './talk';

@NgModule({
  declarations: [
    Talk,
  ],
  imports: [
    IonicPageModule.forChild(Talk),
  ],
  exports: [
    Talk
  ]
})
export class TalkModule {}
