"use client";

import { X } from "lucide-react";
import { useState } from "react";
import { deckFormSchema } from "@/lib/deckForm";

type CardForm = {
  kanji: string;
  hiragana: string;
  meaning: string;
};

export default function CreateForm() {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [cards, setCards] = useState<CardForm[]>([
    { hiragana: "", kanji: "", meaning: "" },
  ]);

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

    try {
      const validatedDeck = deckFormSchema.parse({name, description, cards})

      await fetch("/api/deck/create", {
        method: "POST",
        body: JSON.stringify(validatedDeck)
      })
    } catch(err: any) {

    }
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
            value={cards[index].meaning}
            onChange={(e) => {
              let newValue: CardForm = cards[index];
              newValue.meaning = e.target.value;
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
            value={name}
            onChange={(e) => {
              setName(e.target.value);
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
        <button className="btn btn-success w-fit" type="submit">Create</button>
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
              temp.push({ hiragana: "", kanji: "", meaning: "" });
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
