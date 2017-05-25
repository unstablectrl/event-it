import { FirebaseService } from './../providers/firebase-service';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:string = 'LoginPage';

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private firebaseService: FirebaseService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      firebaseService.authState.subscribe(user => {
        console.log('user changed: ', user);
        if (user)
          this.rootPage = 'Editor';
        else
          this.rootPage = 'LoginPage';
      })
    });
  }
}

