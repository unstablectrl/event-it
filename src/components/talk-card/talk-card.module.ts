import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TalkCard } from './talk-card';

@NgModule({
  declarations: [
    TalkCard,
  ],
  imports: [
    IonicPageModule.forChild(TalkCard),
  ],
  exports: [
    TalkCard
  ]
})
export class TalkCardModule {}
