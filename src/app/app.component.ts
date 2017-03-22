import { Component, OnInit, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { AuthService } from '../providers/auth-service';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { FirebaseAuthState } from 'angularfire2';

@Component({
  templateUrl: 'app.html'
})
export class MyApp implements OnInit {
  @ViewChild(Nav) nav: Nav;
  rootPage = LoginPage;

  constructor(public auth:AuthService, platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  ngOnInit() {
    
    this.auth.authenticated.subscribe((state: FirebaseAuthState) => {
      if(state && state.auth && state.auth.uid !== null) {
        console.log("found user, going to home page");
        this.nav.setRoot(HomePage);
      } else {
        this.nav.setRoot(LoginPage);
      }
    });
    
  }
}
