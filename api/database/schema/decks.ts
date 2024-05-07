import { pgTable, serial, varchar, text } from "drizzle-orm/pg-core";

export const decks = pgTable("decks", {
  id: serial("id").primaryKey(),
  creatorId: text("creator_id").notNull(),
  title: varchar("title", { length: 256 }).notNull(),
  description: varchar("description", { length: 256 }).notNull(),
});
