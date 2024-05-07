import { integer, pgTable, serial, varchar } from 'drizzle-orm/pg-core';
import { decks } from './decks';
// declaring enum in database
export const cards = pgTable('cards', {
  id: serial('id').primaryKey(),
  front: varchar('front', { length: 256 }).notNull(),
  back: varchar('back', { length: 256 }).notNull(),
  definition: varchar('definition', { length: 256 }).notNull(),
  deckId: integer('deck_id').references(() => decks.id),
});