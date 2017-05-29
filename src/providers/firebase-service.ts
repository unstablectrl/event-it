import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';

@Injectable()
export class FirebaseService {
  authState: Observable<firebase.User>;
  user: firebase.User;
  ta: Observable<any[]>;

  constructor(private afAuth: AngularFireAuth, public afd: AngularFireDatabase) {
    this.authState = afAuth.authState;
    console.log('fbservice')
    this.authState.subscribe(user => {
      this.user = user;
    });
  }

  signUp(email, password, name) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(newUser => {
        this.afd.list('/users').update(newUser.uid, {email: email, name: name});
      })
  }

  loginUser(email, password) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  logoutUser() {
    return this.afAuth.auth.signOut();
  }

  resetPassword(email) {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }

  createTalk(talk) {
    talk.creator = this.user.uid;
    return this.afd.list('/talks').push(talk);
  }

  updateTalk(key, talk) {
    return this.afd.object('/talks/' + key).update(talk)
  }

  removeTalk(key) {
    return this.afd.object('/talks/' + key).remove();
  }

  readTalks() {
    this.ta = this.afd.list('/talks', {
        query: {
          orderByChild: 'start'
        }
      })
      .map(talks => {
        talks.map( t => {
          this.afd.object('/themes/' + t.theme).$ref.on('value', snap => {
            let keycopy = t.theme
            t.theme = []
            t.theme.key = keycopy
            Object.keys(snap.val()).map(key => t.theme[key] = snap.val()[key])
          })
          Object.keys(t.authors).map(author => {
            this.afd.object('/people/' + t.authors[author]).$ref.on('value', snap => {
              let keycopy = t.authors[author]
              t.authors[author] = []
              t.authors[author].key = keycopy
              Object.keys(snap.val()).map(key => t.authors[author][key] = snap.val()[key])
            })
          })
        })
        console.log('talks', talks)
        return talks
      })
    return this.ta
  }

  readThemes() {
    return this.afd.list('/themes');
  }

  readPeople() {
    return this.afd.list('/people');
  }

  test() {
    this.afd.list('/people').push({
      name: 'Jane Doe',
      email: 'janed@email.com'
    });
  }

}
