import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Editor } from './editor';

@NgModule({
  declarations: [
    Editor,
  ],
  imports: [
    IonicPageModule.forChild(Editor),
  ],
  exports: [
    Editor
  ]
})
export class EditorModule {}
