"use client";

import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { deckFormSchema } from "@/lib/schema";
import { Prisma } from "@prisma/client";

type CardForm = {
  kanji: string;
  hiragana: string;
  definition: string | null;
};

export default function EditForm({
  deck,
}: {
  deck: Prisma.DeckGetPayload<{ include: { cards: true } }>;
}) {
  const [title, setTitle] = useState<string>(deck.title);
  const [description, setDescription] = useState<string>(deck.description);
  const [isLoading, setIsLoading] = useState(false);
  const [cards, setCards] = useState<CardForm[]>([
    { hiragana: "", kanji: "", definition: "" },
  ]);

  useEffect(() => {
    setTitle(deck.title);
    setDescription(deck.description);
    if (deck.cards.length > 0) {
      setCards([...deck.cards]);
    }
  }, []);

  function handleCardEdit(index: number, newValue: CardForm) {
    let temp = [...cards];
    temp[index] = newValue;
    setCards(temp);
  }

  function handleCardDelete(index: number) {
    if (cards.length - 1 <= 0) {
      return;
    }
    let temp = [...cards];
    temp = temp.filter((val, idx, arr) => {
      if (idx !== index) {
        return true;
      }
      return false;
    });
    setCards(temp);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    const validatedDeck = deckFormSchema.safeParse({
      id: deck.id,
      title,
      description,
      cards,
    });
    if (!validatedDeck.success) {
      console.log(validatedDeck.error.issues);
    } else {
      const res = await fetch("/api/deck/edit", {
        method: "POST",
        body: JSON.stringify(validatedDeck.data),
      });
      console.log(await res.body)
    }
    setIsLoading(false);
  }

  function CardItem(index: number) {
    return (
      <div key={index} className="bg-neutral rounded-xl p-5">
        <div className="flex flex-row justify-between items-center">
          <p className="text-xl">Card #{index + 1}</p>
          <button
            className={
              "btn btn-circle btn-outline btn-sm btn-error " +
              (cards.length !== 1 || "btn-disabled")
            }
            onClick={(_e) => {
              handleCardDelete(index);
            }}
          >
            <X />
          </button>
        </div>
        <div className="lg:flex lg:flex-row">
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Hiragana</span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
              value={cards[index].hiragana}
              onChange={(e) => {
                let newValue: CardForm = cards[index];
                newValue.hiragana = e.target.value;
                handleCardEdit(index, newValue);
              }}
            />
          </label>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Kanji</span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
              value={cards[index].kanji}
              onChange={(e) => {
                let newValue: CardForm = cards[index];
                newValue.kanji = e.target.value;
                handleCardEdit(index, newValue);
              }}
            />
          </label>
        </div>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Meaning</span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full"
            value={cards[index].definition || ""}
            onChange={(e) => {
              let newValue: CardForm = cards[index];
              newValue.definition = e.target.value;
              handleCardEdit(index, newValue);
            }}
          />
        </label>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="lg:w-full">
      <div className="flex flex-col items-end space-y-3">
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Deck name</span>
          </div>
          <input
            type="text"
            placeholder="JLPT N2 Kanji"
            className="input input-bordered w-full"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Description</span>
          </div>
          <textarea
            className="textarea textarea-bordered h-24"
            placeholder="Deck containing all the JLPT N2 Grammer from ..."
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          ></textarea>
        </label>
        <button
          className={
            "btn btn-success w-fit " + (isLoading && "loading loading-spinner")
          }
          type="submit"
        >
          Save
        </button>
      </div>
      <div className="divider"></div>
      <div className="flex flex-col items-center space-y-3">
        {/* Already added cards here */}
        {cards.map((_card, index) => {
          return CardItem(index);
        })}
        <div className="pb-16">
          <button
            className="btn btn-primary"
            onClick={(_e) => {
              let temp = [...cards];
              temp.push({ hiragana: "", kanji: "", definition: "" });
              setCards(temp);
            }}
          >
            Add Card
          </button>
        </div>
      </div>
    </form>
  );
}
