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

    // let ta = this.afd.list('/talks', {
    //   query: {
    //     orderByChild: 'start'
    //   }
    // })
    // let res= [];
    // this.afd.list('/talks').$ref.on('child_added', talksnap=>{
    //   this.afd.list('/themes/'+talksnap.val().theme).$ref.once('value', themesnap=>{
    //     let aaa = talksnap.val()
    //     aaa.theme = themesnap.val()
    //     res.push(aaa)
    //     // console.log('join:',aaa)
    //   })
    // })
    // console.log(res)
    

    // ta.map(x=> {

    // })
    
    // let tal = ta.$ref;
    // tal.on('child_added', snap => {
    //   // console.log(snap.val())
    //   console.log('')
    //   let themes = this.afd.list('/themes/'+snap.val().theme).$ref;
    //   themes.once('value', themeSnap => {
    //     console.log(themeSnap.val())
    //   })

    //   let th = this.afd.list('/themes/'+snap.val().theme)
    //   th.subscribe(theme=>{
    //     console.log('something', theme)
    //   })
    // })

    this.ta = this.afd.list('/talks')
      .map(talks => {
        talks.map( t => {
          this.afd.object('/themes/' + t.theme).$ref.once('value', snap => {
            console.log(snap.val())
            t.themec = Object.keys(snap.val()).map(key => [key, snap.val()[key]])
          })
        })
        console.log('talks', talks)
        return talks
      })
    console.log('ta', this.ta)
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
