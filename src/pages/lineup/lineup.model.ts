export class LineupModel {
    battingOrder: Array<PlayerModel> = [];
    fielding: Array<FieldingInning> = [];
}

export class PlayerModel {
    name: String;
}

export class FieldingInning {
    inning: String;
    positions: Array<FieldingModel>;
}


export class FieldingModel {
    player: PlayerModel;
    position: PositionModel;
}

export class PositionModel {
    name: String;
    abbr: String;
    label: String;
}

export class Player {
    name: string;
    email: string;
    phone: string;
    image: string;
    description: string;
    birthdate: Date;
    year: number;
    season: string;
    id: string;
    admin: number;
    color: string;
    textColor: string;
    constructor() {
        this.name = 'Brian';
    }
}

export class GamePlayer {
    name: string;
    email: string;
    phone: string;
    image: string;
    description: string;
    birthdate: Date;
    year: number;
    season: string;
    id: string;
    admin: number;
    positions: PlayerInning[];
    hitting: AtBat[];
    color: string;
    textColor: string;
    constructor() {
        this.name = 'Brian';
    }
}

export class AtBat {
    inning: Inning;
    pitches: number;
    scored: number;
    hittype: HitType;
    totalbases: number;
    strikeout: number;  // yes/no
    fouls: number;
}

export class HitType {
    label: string; // single, double, triple, homerun, flyout, groundout
    bases: number;
    position: Position; // where did the hit go
    out: number; // get out or on base?

}

export class Lineup {
    name: string;
    id: string;
    description: string;
    date: Date;
    opponentName: string;
    finished: number;
    playing: GamePlayer[];
    notPlaying: GamePlayer[];
    positions: GameInning[];
    constructor() {
        this.playing = new Array<GamePlayer>();
        this.notPlaying = new Array<GamePlayer>();
        this.positions = new Array<GameInning>();
    }
}

export class Position {
    label: string;
    id: string;
    abbreviation: string;
    name: string;
    sortValue: number;
    restricted: number;
    style: string;
}




export class GamePosition {
    position: Position;
    player: Player;
    constructor(total: number, positionNumber: number) {
        this.player = new Player();
        this.position = new Position();

        switch (positionNumber) {
            case 0:
                this.position.abbreviation = 'BN';
                this.position.sortValue = 0;
                this.position.name = 'BENCH';
                this.position.label = 'BN';
                this.position.restricted = 0;
                this.position.style = 'bench';
                break;
            case 1:
                this.position.abbreviation = 'P';
                this.position.sortValue = 1;
                this.position.name = 'PITCHER';
                this.position.label = 'P';
                this.position.restricted = 0;
                this.position.style = 'pitcher';
                break;
            case 2:
                this.position.abbreviation = 'C';
                this.position.sortValue = 2;
                this.position.name = 'CATCHER';
                this.position.label = 'C';
                this.position.restricted = 0;
                this.position.style = 'catcher';
                break;
            case 3:
                this.position.abbreviation = '1B';
                this.position.sortValue = 3;
                this.position.name = 'FIRST BASE';
                this.position.label = '1B';
                this.position.restricted = 1;
                this.position.style = 'firstbase';
                break;
            case 4:
                this.position.abbreviation = '2B';
                this.position.sortValue = 4;
                this.position.name = 'SECOND BASE';
                this.position.label = '2B';
                this.position.restricted = 1;
                this.position.style = 'secondbase';
                break;
            case 5:
                this.position.abbreviation = '3B';
                this.position.sortValue = 5;
                this.position.name = 'THIRD BASE';
                this.position.label = '3B';
                this.position.restricted = 0;
                this.position.style = 'thirdbase';
                break;
            case 6:
                this.position.abbreviation = 'SS';
                this.position.sortValue = 6;
                this.position.name = 'SHORTSTOP';
                this.position.label = 'SS';
                this.position.restricted = 0;
                this.position.style = 'shortstop';
                break;
            case 7:
                this.position.abbreviation = 'LF';
                this.position.sortValue = 0;
                this.position.name = 'LEFT FIELD';
                this.position.label = 'LF';
                this.position.restricted = 0;
                this.position.style = 'leftfield';
                break;
            case 8:
                if (total == 10) {
                    this.position.abbreviation = 'LCF';
                    this.position.sortValue = 8;
                    this.position.name = 'LEFT CENTER FIELD';
                    this.position.label = 'LFC';
                    this.position.restricted = 0;
                    this.position.style = 'leftcenterfield';
                    break;
                } else {
                    this.position.abbreviation = 'CENTER FIELD';
                    this.position.sortValue = 8;
                    this.position.name = 'CENTER FIELD';
                    this.position.label = 'BN';
                    this.position.restricted = 0;
                    this.position.style = 'centerfield';
                    break;
                }

            case 9:
                if (total == 10) {
                    this.position.abbreviation = 'LCF';
                    this.position.sortValue = 9;
                    this.position.name = 'LEFT CENTER FIELD';
                    this.position.label = 'LFC';
                    this.position.restricted = 0;
                    this.position.style = 'leftcenterfield';
                    break;
                } else {
                    this.position.abbreviation = 'RIGHT FIELD';
                    this.position.sortValue = 9;
                    this.position.name = 'RIGHT FIELD';
                    this.position.label = 'BN';
                    this.position.restricted = 0;
                    this.position.style = 'rightfield';
                    break;
                }
            case 10:
                this.position.abbreviation = 'RIGHT FIELD';
                this.position.sortValue = 10;
                this.position.name = 'RIGHT FIELD';
                this.position.label = 'BN';
                this.position.restricted = 0;
                this.position.style = 'rightfield';
                break;

            default:
                this.position.abbreviation = 'BN';
                this.position.sortValue = 0;
                this.position.name = 'BENCH';
                this.position.label = 'BN';
                this.position.restricted = 0;
                break;
        }
    }
}

export class Inning {
    label: string;
    id: string;
    abbreviation: string;
    name: string;
    sortValue: number;
    constructor(num: number) {
        this.sortValue = num;
        switch (num) {
            case 1:
                this.label = '1st';
                this.abbreviation = '1st';
                this.name = '1st';
                break;
            case 2:
                this.label = '2nd';
                this.abbreviation = '2nd';
                this.name = '2nd';
                break;
            case 3:
                this.label = '3rd';
                this.abbreviation = '3rd';
                this.name = '3rd';
                break;
            case 4:
                this.label = '4th';
                this.abbreviation = '4th';
                this.name = '4th';
                break;
            case 5:
                this.label = '5th';
                this.abbreviation = '5th';
                this.name = '5th';
                break;
            case 6:
                this.label = '6th';
                this.abbreviation = '6th';
                this.name = '6th';
                break;
            default:
                this.label = '1st';
                this.abbreviation = '1st';
                this.name = '1st';
        }
    }
}



export class PlayerInning {
    // keep track of what position the player played this inning
    inning: Inning;
    position: Position;
    constructor(num: number) {
        this.inning = new Inning(num);
        this.position = new Position();
    }
}
export class GameInning {
    inning: Inning;
    positions: GamePosition[];
    constructor(inningNumber: number) {
        this.positions = new Array<GamePosition>();
        this.inning = new Inning(inningNumber);
    }
}

function createGameInning(num: number): GameInning {
    let gi: GameInning = new GameInning(num);
    return gi;
}

// left off keeping track of what innings have what players, and what positions players are playing for each inning
/*
  * IGameInning - keep track of the inning you are looking at, and which positions it has,

*/



