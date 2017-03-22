import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Platform } from 'ionic-angular';


@Component({
  templateUrl: 'account.html',
})
export class AccountPage {

  viewAdminFeatures = false;
  platform : Platform;
  profileImageDisplay = false;
  submitted: boolean = false;

  setViewAdmin(event) {

  }
  

  constructor(private navCtrl: NavController, platform: Platform) {
    this.platform = platform
  }

  ionViewDidEnter() {


  }
}
