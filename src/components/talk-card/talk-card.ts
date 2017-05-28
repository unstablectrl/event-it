import { Component, Input } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2/database';

import { FirebaseService } from './../../providers/firebase-service';

@Component({
  selector: 'talk-card',
  templateUrl: 'talk-card.html'
})
export class TalkCard {

  @Input('something') talks: FirebaseListObservable<any[]>;

  constructor(public firebaseService: FirebaseService) {
    this.firebaseService.authState.subscribe(user => {
      if (user) {
        // this.talks = this.firebaseService.readTalks();
      }
    })
  }

  cardClick(talk) {
    console.log('cardClick original');
  }

}
