import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { AngularFire } from 'angularfire2';
import { HomePage } from '../home/home';
/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public af: AngularFire,
    private _auth: AuthService) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  signInWithGoogle(): void {
    console.log("logging in with google...");
    this._auth.signInWithGoogle()
      .then(() => this.onSignInSuccess());
  }

  signInWithFacebook():void {
    this._auth.signInWithFacebook()
      .then(() => this.onSignInSuccess())
  }

  private onSignInSuccess(): void {
    console.log("Google display name ", this._auth.displayName());
  //  this.navCtrl.setRoot(HomePage);
  }

}
