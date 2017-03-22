import { Component, ViewChild } from '@angular/core';
import { NavController, LoadingController, Slides } from 'ionic-angular';
import { Lineup, GamePlayer, Player, GameInning, Inning, Position } from './lineup.model';
import { LineupService } from './lineup.service';
import { AngularFire } from 'angularfire2';
import 'rxjs/Rx';


@Component({
  selector: 'lineup-page',
  templateUrl: 'lineup.html',
  providers: [LineupService]
})
export class LineupPage {
  loading: any;
  inning: string;
  mode: string = "fielding";
  currentInning: number = 1;
  lineupSubscription: any;
  description: string;
  id: string;
  finished: boolean;
  lineup: Lineup;
  opponentName: string;
  field: string;
  date: Date = new Date();
  playing: GamePlayer[];
  notPlaying: Player[];
  action: string;
  positions: Position[];
  innings: Inning[];
  playingInnings: GameInning[];

  lineupPage: any = LineupPage;
  @ViewChild(Slides) slides: Slides;

  constructor(
    public nav: NavController,
    public lineupService: LineupService,
    public loadingCtrl: LoadingController,
    public af: AngularFire,
  ) {
    this.inning = "1";
    this.loading = this.loadingCtrl.create();
  }

  ionViewDidLoad() {


    this.loadLineup();
  }

  loadLineup() {
    this.loading.present();
    this.lineupService.getPositions(10)
      .subscribe((positionData) => {

        this.positions = positionData.map(this.toPosition);
          console.log("positions:" + JSON.stringify(this.positions, null, 2));
      });
    this.lineupService.getInnings()
      .subscribe((data) => {
        this.innings = data.map(this.toInning);
        this.lineupService.getPlayers()
          .subscribe((playerData) => {
          
            this.playing = playerData.map(this.toGamePlayer);
            this.playingInnings = this.createGameInnings();
          //    console.log("playingInnings:" + JSON.stringify(this.playingInnings, null, 2));
          })
      });


    this.af.database.object('/lineups/' + this.id)
      .subscribe((data) => {
        if (data) {
          this.lineup = this.toLineup(this.id, data);
          this.opponentName = data.opponentName;
          if (data.date) {
            this.date = data.date;
          }

        }
        //console.log("data: " + JSON.stringify(data, null, 2));
        this.currentInning = 1;
        this.loading.dismiss();
      });
  }



  createGameInnings(): GameInning[] {
    let innings: GameInning[] = new Array<GameInning>();
    for (let i = 0; i < this.innings.length; i++) {
      let gi = new GameInning(i);
      let inning = new Inning(i);
      inning.abbreviation = this.innings[i].abbreviation;
      inning.label = this.innings[i].label;
      inning.sortValue = this.innings[i].sortValue;
      inning.id = this.innings[i].id;
      gi.inning = inning;
      gi.positions = LineupService.createGamePositions(10);
      innings.push(gi);
    }
    return innings;
  }

  toPosition(data) {
    return <Position>({
      id: data.id,
      label: data.label,
      name: data.name,
      abbreviation: data.abbreviation,
    });
  }

  toInning(data) {
    return <Inning>({
      id: data.id,
      label: data.label,
      abbreviation: data.abbreviation,
      name: data.name,
      sortValue: data.sortValue,
    });
  }

  slideChanged() {
    console.log("inside slideChanged...");
    let currentIndex = this.slides.getActiveIndex();
    this.currentInning = currentIndex + 1;
    console.log("Current index is", currentIndex);
  }

  toLineup(id: string, json: any): Lineup {

    // console.log("r: " + JSON.stringify(r,null,2));
    return <Lineup>({
      name: json.name,
      description: json.description,
      opponentName: json.opponentName,
      date: json.date,
      year: json.year,
      season: json.season,
      id: json.$key,
      finished: json.finished,
      positions: this.toPositions(json.positions),
      playing: this.toGamePlayers(json.playing),
      notPlaying: this.toGamePlayers(json.notPlaying),
    });
  }

  toPositions(positions) {
    if (!positions) {
      return [];
    }
    return positions.map(this.toPosition);
  }

  toGamePlayers(players) {
    if (!players) {
      return [];
    }
    return players.map(this.toGamePlayer);
  }

  toGamePlayer(player) {
    return <GamePlayer>({
      id: player.$key,
      name: player.name,
      email: player.email,
      phone: player.phone,
      image: player.image,
      description: player.description,
      birthdate: player.birthDate,
      year: player.year,
      season: player.season,
      innings: player.innings,
      admin: player.admin,
      positions: player.positions,
      hitting: player.hitting,
      color: player.color,
      textColor: player.textColor,
    });

  }




}
