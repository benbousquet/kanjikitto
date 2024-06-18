import { z } from "zod";

export const deckFormSchema = z.object({
  name: z
    .string().min(1, "Deck name cannot be empty").max(75, "Title cannot be longer than 75 characters"),
  description: z.string().min(1, "Deck description cannot be empty").max(1000, "Description cannot be longer than 1000 characters"),
  cards: z
    .array(
      z.object({
        hiragana: z.string().min(1, "Hiragana field cannot be empty"),
        kanji: z.string().min(1, "Kanji field cannot be empty"),
        meaning: z.string().min(0),
      })
    )
    .nonempty()
    .max(500, "Deck can only have a maximum of 500 cards"),
});
