import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';

import 'rxjs/Rx';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

import { Player, RosterModel } from './roster.model';


@Component({
  selector: 'roster-page',
  templateUrl: 'roster.html'
})
export class RosterPage {
  items: FirebaseListObservable<any>;
  players: Player[];
  filteredPlayers: Player[];
  roster: RosterModel = new RosterModel();
  loading: any;
  playersSubscription: any;

  constructor(
    public nav: NavController,
    public loadingCtrl: LoadingController,
    public af: AngularFire
  ) {
    this.players = new Array<Player>();
    this.loading = this.loadingCtrl.create();
  }

  ionViewDidLoad() {
    this.loading.present();
    this.roster.players = null;
     this.playersSubscription = this.af.database.list('/players').subscribe(players => {

      this.roster.players = players.map(toPlayer);
     // console.log('players: ' + JSON.stringify(this.filteredPlayers, null, 2));
      this.players = this.filteredPlayers;
      this.loading.dismiss();

    }, (error: Error) => {
      console.log('ERROR: ', error);
    });
  }

  reorderItems(indexes){
 let element = this.roster.players[indexes.from];
 this.roster.players.splice(indexes.from, 1);
 this.roster.players.splice(indexes.to, 0, element);
};

  addPlayers(): void {
    for (let i = 0; i < 10; i++) {
      let player = <Player>({
        name: "Player " + i,
        email: "player" + i + "@gmail.com",
        phone: "703-349-9059",
        image: '',
        description: '',
        birthdate: new Date(),
        year: 2017,
        season: 'Spring'
      });
      this.items.push({ player: player });
    }
  }

}



function toPlayer(json: any): Player {
  //console.log("json: " + JSON.stringify(json,null,2));
  return <Player>({
    id: json.$key,
    name: json.name,
    email: json.email,
    phone: json.phone,
    image: json.image,
    description: json.description,
    birthdate: json.birthDate,
    year: json.year,
    season: json.season,
    color: json.color,
    textColor: json.textColor,
  });
}
