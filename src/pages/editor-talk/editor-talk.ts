import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { FirebaseService } from './../../providers/firebase-service';

@IonicPage()
@Component({
  selector: 'page-editor-talk',
  templateUrl: 'editor-talk.html',
})
export class EditorTalk {
  public talkForm: FormGroup;
  public talk: any;
  public content: object;

  constructor(public navParams: NavParams, public viewCtrl: ViewController, public formBuilder: FormBuilder, public firebaseService: FirebaseService) {
    this.talkForm = this.formBuilder.group({
      title: ['', Validators.required]
    });
    this.talk = navParams.get('talk');
    this.content = navParams.get('content');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewTalk');
    console.log(this.talk);
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  createTalk() {
    this.firebaseService.createTalk(this.talkForm.value)
      .then(()=>{
        this.closeModal();
      })
  }

  updateTalk() {
    this.firebaseService.updateTalk(this.talk.$key, this.talkForm.value)
      .then(()=>{
        this.closeModal();
      })
  }

  removeTalk() {
    this.firebaseService.removeTalk(this.talk.$key)
      .then(()=>{
        this.closeModal();
      })
  }

  onAction(key) {
    if (key == 'create') this.createTalk()
    if (key == 'update') this.updateTalk()
  }

}
