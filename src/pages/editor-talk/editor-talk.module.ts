import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditorTalk } from './editor-talk';

@NgModule({
  declarations: [
    EditorTalk,
  ],
  imports: [
    IonicPageModule.forChild(EditorTalk),
  ],
  exports: [
    EditorTalk
  ]
})
export class EditorTalkModule {}
