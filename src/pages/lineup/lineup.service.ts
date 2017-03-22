import { Injectable } from "@angular/core";
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { LineupModel, Inning, Player, PlayerInning, Position, GamePosition } from './lineup.model';
import { AngularFire } from 'angularfire2';


@Injectable()
export class LineupService {
  constructor(public http: Http, public af: AngularFire) {}

  getData(): Promise<LineupModel> {
    return this.http.get('http://52.90.86.84:8080/lineups')
     .toPromise()
     .then(response => response.json() as LineupModel)
     .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  getInnings(): any {
    return this.af.database.list('/innings');
  }

  getPositions(num): any {
    if (num === 9) {
      return this.af.database.list('/positions9');
    } else {
      return this.af.database.list('/positions10');
    }

  }

  getPlayers(): any {
    return this.af.database.list('/players');
  }

  // tslint:disable-next-line:member-ordering
  static getInning(num: number) {
    let inning: Inning = new Inning((num+1));
    return inning;
  }

  static createGamePositions(num) {
    let positions: GamePosition[] = new Array<GamePosition>();
    for (let i = 0; i <= num; i++) {
      let pi: GamePosition = new GamePosition(num,i);
      console.log("pi.style: " + pi.position.style);
      positions.push(pi);
    }
    return positions;
  }


  static getDefaultPosition() {
    let position: Position = new Position();
    position.abbreviation = 'BN';
    position.sortValue = 0;
    position.name = 'BENCH';
    position.label = 'BN';
    position.restricted = 0;
    return position;
  }

  static createPlayerInnings(): PlayerInning[] {
    let playerInnings: PlayerInning[] = new Array<PlayerInning>();
    for (let i = 0; i <= 6; i++) {
      let pi: PlayerInning = new PlayerInning(i);
      let inning = this.getInning(i);
      pi.inning = inning;
      pi.position = this.getDefaultPosition();
      playerInnings.push(pi);
    }
    return playerInnings;
  }

}
