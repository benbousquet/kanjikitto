import { z } from "zod";

export const deckFormSchema = z.object({
  id: z
    .number({
      required_error: "Id is required",
      invalid_type_error: "Id must be a number",
    })
    .positive({ message: "Id must be positive" }),
  name: z
    .string()
    .min(1, "Deck name cannot be empty")
    .max(75, "Title cannot be longer than 75 characters"),
  description: z
    .string()
    .min(1, "Deck description cannot be empty")
    .max(1000, "Description cannot be longer than 1000 characters"),
  cards: z
    .array(
      z.object({
        hiragana: z.string().min(1, "Hiragana field cannot be empty"),
        kanji: z.string().min(1, "Kanji field cannot be empty"),
        definition: z.string().min(0),
      })
    )
    .nonempty("Deck can not be empty")
    .max(500, "Deck can only have a maximum of 500 cards"),
});
