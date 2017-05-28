import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Editor } from './editor';
import { TalkCard } from './../../components/talk-card/talk-card';

@NgModule({
  declarations: [
    Editor,
    TalkCard
  ],
  imports: [
    IonicPageModule.forChild(Editor),
  ],
  exports: [
    Editor
  ]
})
export class EditorModule {}
