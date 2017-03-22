import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RosterPage } from '../pages/roster/roster';
import { LineupPage } from '../pages/lineup/lineup';
import { LineupsPage } from '../pages/lineups/lineups';
import { AccountPage } from '../pages/account/account';
// Import the AF2 Module
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import { AuthService } from '../providers/auth-service';


const firebaseConfig = {
  apiKey: 'AIzaSyCiyibrg0xnqehfL7H1wo0VGWBkfY-WE6M',
  authDomain: 'ponytail-express.firebaseapp.com',
  databaseURL: 'https://ponytail-express.firebaseio.com',
  storageBucket: 'ponytail-express.appspot.com',
  messagingSenderId: '835594114971'
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RosterPage,
    LineupPage,
    LineupsPage,
    AccountPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig, {
      provider: AuthProviders.Google,
      method: AuthMethods.Popup,
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RosterPage,
    LineupPage,
    LineupsPage,
  ],
  providers: [AuthService,{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
