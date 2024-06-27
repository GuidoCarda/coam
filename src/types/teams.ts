import type { Player } from "./player"

export type Team = {
  id: number,
  name: string,
  acronym: string,
  image: string,
}

export interface TeamPlayer{
  id: number,
  players: Player[]
}