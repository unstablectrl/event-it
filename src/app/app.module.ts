import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { FirebaseService } from './../providers/firebase-service';

export const firebaseConfig = {
  apiKey: "AIzaSyD3TkfPWBYrvjuul0hSxT5zKaKkp6JN31o",
  authDomain: "event-it-45529.firebaseapp.com",
  databaseURL: "https://event-it-45529.firebaseio.com",
  projectId: "event-it-45529",
  storageBucket: "event-it-45529.appspot.com",
  messagingSenderId: "742037213244"
};

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FirebaseService
  ]
})
export class AppModule {}
