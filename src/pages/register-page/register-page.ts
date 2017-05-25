import { FirebaseService } from './../../providers/firebase-service';
import { EmailValidator } from './../../validators/email';
import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, Loading, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-register-page',
  templateUrl: 'register-page.html',
})
export class RegisterPage {
  signupForm: FormGroup;
  loading: Loading;

  constructor(public navCtrl: NavController, public formBuilder: FormBuilder, public firebaseService: FirebaseService, public loadingCtrl: LoadingController, public alertCtrl: AlertController) {
    this.signupForm = formBuilder.group({
      email: ['', Validators.compose([EmailValidator.isValid, Validators.required])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
      name: ['', Validators.compose([Validators.minLength(2), Validators.required])]
    });
  }

  signupUser() {
    if (this.signupForm.valid) {
      this.loading = this.loadingCtrl.create();
      this.loading.present();

      this.firebaseService.signUp(this.signupForm.value.email, this.signupForm.value.password, this.signupForm.value.name)
        .then(() => {
          this.loading.dismiss().then(() => {
            this.navCtrl.setRoot('LoginPage');
          });
        }, error => {
          this.loading.dismiss().then(() => {
            this.alertCtrl.create({
              title: 'Error',
              message: error.message,
              buttons: [
                {
                  text: 'OK',
                  role: 'cancel'
                }
              ]
            }).present();
          });
        });
    }
  }

}
