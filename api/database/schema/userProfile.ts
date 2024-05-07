import {
  pgTable,
  serial,
  varchar,
  text,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const userProfile = pgTable(
  "user_profiles",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id").notNull(),
    username: varchar("username", { length: 12 }).unique().notNull(),
  },
  (userProfile) => {
    return {
      nameIndex: uniqueIndex("username_idx").on(userProfile.username),
    };
  }
);
