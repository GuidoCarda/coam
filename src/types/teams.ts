export interface TeamPlayer {
  id:      number;
  players: Player[];
}

export interface Player {
  id:       string;
  number:   number;
  name:     string;
  image:    string;
  position: Position;
  team?:    string;
}

export enum Position {
  Arquero = "Arquero",
  CentroCampista = "Centro campista",
  Defensa = "Defensa",
  Delantero = "Delantero",
  Lateral = "Lateral",
}