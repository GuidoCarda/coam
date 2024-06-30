import { integer, pgTable, varchar,timestamp } from "drizzle-orm/pg-core";

export const Votes = pgTable('votes', {
  // id: serial('id').primaryKey(),
  id_user: varchar("id_user"),
  id_match: varchar("id_match"),
  team_home_id: integer("team_home_id"),
  team_away_id: integer("team_away_id"),
  score_home: integer("score_home"),
  score_away: integer("score_away"),
  team_winner_id: integer("team_winner_id"),
  created_at: timestamp('created_at')
});