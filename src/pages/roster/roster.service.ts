import { Injectable } from "@angular/core";

import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

import { Player, RosterModel } from './roster.model';

@Injectable()
export class RosterService {
  items: FirebaseListObservable<any>;
  players: Player[];
  filteredPlayers: Player[];
  roster: RosterModel;
  constructor(public af: AngularFire) {}


  

  getData(): void {
    this.items = this.af.database.list('/players');
    this.items.subscribe(raw => {
      //this.filteredPlayers = raw.map(toPlayer);
      
    }, (error: Error) => {

    });
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}

