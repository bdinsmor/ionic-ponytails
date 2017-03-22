import { Component } from '@angular/core';

import { NavController, NavParams, Tab, Tabs, AlertController, ActionSheetController } from 'ionic-angular';

import { AngularFire, FirebaseAuthState } from 'angularfire2';
import { RosterPage } from '../roster/roster'; 
import { LineupsPage } from '../lineups/lineups'; 
import { AccountPage } from '../account/account';
import { LoginPage } from '../login/login';
import { AuthService } from '../../providers/auth-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  tab1Root: any = RosterPage;
  tab2Root: any = LineupsPage;
  tab3Root: any = AccountPage;

  mySelectedIndex: number;
  photoURL: string;
  displayName: string;

  constructor(
    public auth: AuthService,
    public nav: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public actionSheetCtrl: ActionSheetController,
    public af: AngularFire) {
      this.mySelectedIndex = navParams.data.tabIndex || 0;
  }

  ionViewDidLoad() {
    console.log("inside home page didload...")
  }

  ngOnInit() {
    this.auth.authenticated.subscribe((state: FirebaseAuthState) => {
      if(!state || !state.auth || state.auth.uid == null || state.auth.uid == '') {
        this.nav.setRoot(LoginPage);
      } else {
        this.photoURL = state.auth.photoURL;
        this.displayName = state.auth.displayName;
        console.log("photo url: " + this.photoURL);
      }
    });
  }

  logout() {
    let confirm = this.alertCtrl.create({
      title: this.displayName,
      message: 'Do you want to logout?',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.auth.signOut();
          }
        },
        {
          text: 'Cancel',
          handler: () => {
            return;
          }
        }
      ]
    });
    confirm.present();
  }


  showRoot(tabs : Tabs, index : number) {
    // if a child page is associated with that Tab, then pop it off the NavController stack
    let tab : Tab = tabs.getByIndex(index);
    let views = tab['_views'];
    if (views.length > 1) {
      let navController = views[views.length - 1].instance.navCtrl
      if (navController) {
        navController.popToRoot({animate: false});
      }
    }
	} 


}
