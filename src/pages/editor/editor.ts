import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
// import { FirebaseListObservable } from 'angularfire2/database';

import { FirebaseService } from './../../providers/firebase-service';

@IonicPage()
@Component({
  selector: 'page-editor',
  templateUrl: 'editor.html',
})
export class Editor {

  // talks: FirebaseListObservable<any[]>;
  talks;

  constructor(public navCtrl: NavController, public navParams: NavParams, public firebaseService: FirebaseService, private modal: ModalController) {
  }

  ionViewDidLoad() {
    this.firebaseService.authState.subscribe(user => {
      if (user) {
        this.talks = this.firebaseService.readTalks();
      }
    });
  }

  logOut() {
    this.firebaseService.logoutUser();
  }

  cardClick(talk) {
    console.log('cardClick New');
    this.updateTalk(talk);
  }

  updateTalk(talk) {
    const content = {
      title: 'Edit Talk',
      action: 'update',
      actionText: 'Update!'
    }
    const updateTalkModel = this.modal.create('EditorTalk', {'talk': talk, 'content': content});
    updateTalkModel.present();
  }

  createTalk() {
    const content = {
      title: 'Create New Talk',
      action: 'create',
      actionText: 'New Talk!'
    }
    const newTalkModel = this.modal.create('EditorTalk', {'content': content});
    newTalkModel.present();
  }

  createTheme() {
    const content = {
      title: 'Create New Theme',
      action: 'create',
      actionText: 'New Theme!'
    }
    const newTalkModel = this.modal.create('EditorTheme', {'content': content});
    newTalkModel.present();
  }

  createPerson() {
    const content = {
      title: 'Create New Person',
      action: 'create',
      actionText: 'New Person!'
    }
    const newTalkModel = this.modal.create('EditorPerson', {'content': content});
    newTalkModel.present();
  }

  test() {
    this.firebaseService.test();
  }

}
