export class RosterModel {
  name: string;
  image: string;
  description: string;
  coaches: Coach[];
  players: Player[];
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
}

export class Coach {
  name: string;
  email: string;
  phone: string;
}

