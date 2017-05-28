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
  public themes: any;
  public people: any;
  public content: object;
  public start: String;
  public end: String;
  public theme: String;
  public authors: String;

  constructor(public navParams: NavParams, public viewCtrl: ViewController, public formBuilder: FormBuilder, public firebaseService: FirebaseService) {
    this.talkForm = this.formBuilder.group({
      title: ['', Validators.required],
      // start: [new Date().toISOString(), Validators.required],
      // end: [new Date().toISOString(), Validators.required],
      // description: ['', Validators.required],
      authors: ['', Validators.required]
      // theme: ['', Validators.required],
      // tags: ['', Validators.required]
    });
    this.talk = navParams.get('talk');
    this.content = navParams.get('content');
    if (this.talk && this.talk.theme) this.theme = this.talk.theme;
    if (this.talk && this.talk.authors) this.authors = this.talk.authors;
  }

  ionViewDidLoad() {
    this.themes = this.firebaseService.readThemes();
    this.people = this.firebaseService.readPeople();
    console.log('ionViewDidLoad NewTalk');
    console.log(this.talk);
    console.log('form: ', this.talkForm.value);
    if (this.talk && this.talk.start) this.start = this.talk.start;
    if (this.talk && this.talk.end) this.end = this.talk.end;
    
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  createTalk() {
    let talk = this.talkForm.value;
    // talk.tags = this.talkForm.value.tags.split(',');
    this.firebaseService.createTalk(talk)
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

  test() {
    console.log('form: ', this.talkForm.value);
  }

}
