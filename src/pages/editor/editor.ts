import { FirebaseService } from './../../providers/firebase-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-editor',
  templateUrl: 'editor.html',
})
export class Editor {

  items: FirebaseListObservable<any[]>;
  fbName: FirebaseObjectObservable<any>;
  talks: FirebaseListObservable<any[]>;
  start: String = new Date().toISOString();
  end: String = new Date().toISOString();

  constructor(public navCtrl: NavController, public navParams: NavParams, afDB: AngularFireDatabase, public firebaseService: FirebaseService, private modal: ModalController) {
    this.talks = afDB.list('/talks');
    this.fbName = afDB.object('/myname');
  }

  setName(newName) {
    this.fbName.set({name: newName});
  }

  setTalk(title, authors, tags, theme) {
    this.talks.push({
      "title": title,
      "authors": authors.split(","),
      "start": this.start,
      "end": this.end,
      "tags": tags.split(","),
      "theme": theme
    });
  }

  removeTalk(key) {
    this.talks.remove(key);
  }

  logOut() {
    this.firebaseService.logoutUser();
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

}
