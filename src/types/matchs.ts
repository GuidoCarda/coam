export interface Match {
  matchId:   string;
  matchDay:  string;
  date:      Date;
  timeZone:  TimeZone;
  team_data: TeamDatum[];
  stadium?:  string;
}

export interface TeamDatum {
  score:    string;
  side:     Side;
  teamref:  string;
  team:     string;
  team_id?: number;
}

export enum Side {
  Away = "Away",
  Home = "Home",
}

export enum TimeZone {
  Bst = "BST",
}
