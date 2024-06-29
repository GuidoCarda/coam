export interface Vote {
  id?: number,
  id_user?: string,
  id_match: string,
  team_home_id: number,
  team_away_id: number,
  score_home: number,
  score_away: number,
  team_winner_id?: number
}