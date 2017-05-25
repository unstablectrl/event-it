import { FirebaseService } from './../../providers/firebase-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, afDB: AngularFireDatabase, public firebaseService: FirebaseService) {
    this.talks = afDB.list('/talks');
    this.fbName = afDB.object('/myname');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Firebase');
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

}
