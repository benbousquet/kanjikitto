CREATE TABLE IF NOT EXISTS "cards" (
	"id" serial PRIMARY KEY NOT NULL,
	"front" varchar(256) NOT NULL,
	"back" varchar(256) NOT NULL,
	"definition" varchar(256) NOT NULL,
	"deck_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "decks" (
	"id" serial PRIMARY KEY NOT NULL,
	"creator_id" text NOT NULL,
	"title" varchar(256) NOT NULL,
	"description" varchar(256) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_profiles" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"username" varchar(12) NOT NULL,
	CONSTRAINT "user_profiles_username_unique" UNIQUE("username")
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "username_idx" ON "user_profiles" ("username");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "cards" ADD CONSTRAINT "cards_deck_id_decks_id_fk" FOREIGN KEY ("deck_id") REFERENCES "decks"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
