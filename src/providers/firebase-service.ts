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

  constructor(private afAuth: AngularFireAuth, public afd: AngularFireDatabase) {
    this.authState = afAuth.authState;
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

}
