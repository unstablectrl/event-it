import { FirebaseService } from './../../providers/firebase-service';
import { EmailValidator } from './../../validators/email';
import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, Loading, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-login-page',
  templateUrl: 'login-page.html',
})
export class LoginPage {
  loginForm: FormGroup;
  loading: Loading;

  constructor(public navCtrl: NavController, public formBuilder: FormBuilder, public firebaseService: FirebaseService, public loadingCtrl: LoadingController, public alertCtrl: AlertController) {
    this.loginForm = formBuilder.group({
      email: ['', Validators.compose([EmailValidator.isValid, Validators.required])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });
  }

  goToSignup() {
    this.navCtrl.push('RegisterPage');
  }

  loginUser() {
    if (this.loginForm.valid) {
      this.loading = this.loadingCtrl.create();
      this.loading.present();

      this.firebaseService.loginUser(this.loginForm.value.email, this.loginForm.value.password)
        .then((data) => {
          console.log('Data: ', data);
          this.loading.dismiss();
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

  resetPassword() {
    let prompt = this.alertCtrl.create({
      title: 'Reset Password',
      message: 'Enter your email below',
      inputs: [
        {
          name: 'email',
          placeholder:  'john@doe.com'
        }
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Reset',
          handler: data => {
            this.firebaseService.resetPassword(data.email).then(data => {
              this.showBasicAlert('Success', 'Check your email for further instructions.')
            })
            .catch(err => {
              this.showBasicAlert('Error', err.message)
            });
          }
        }
      ]
    });
    prompt.present();
  }

  showBasicAlert(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }

}
