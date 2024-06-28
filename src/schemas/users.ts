import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name'),
  created_at: timestamp('created_at'),
});
