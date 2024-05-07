import { useEffect, useState } from "react";
import DeckCard from "./deckCard";
import { Input } from "../@/components/ui/input";
import { Button } from "../@/components/ui/button";

type DeckInfo = {
  name: string;
  description: string;
  id: string;
  author: string;
  length: number;
  dateCreated: Date;
};

function DeckViewList() {
  const [decksRes, setDecksRes] = useState<DeckInfo[]>([]);
  useEffect(() => {
    setDecksRes([
      {
        name: "Genki 1 Kanji",
        description: "This deck contains all the Genki 1 kanji",
        id: "1",
        author: "JP Learner 22",
        length: 15,
        dateCreated: new Date(),
      },
      {
        name: "JLPT N5 Kanji List",
        description: "This deck contains all the N5 kanji",
        id: "2",
        author: "JP Learner",
        length: 20,
        dateCreated: new Date(),
      },
      {
        name: "JLPT N4 Kanji List",
        description: "This deck contains all the N4 kanji",
        id: "3",
        author: "JP Learner",
        length: 20,
        dateCreated: new Date(),
      },
      {
        name: "JLPT N3 Kanji List",
        description: "This deck contains all the N3 kanji",
        id: "4",
        author: "JP Learner",
        length: 20,
        dateCreated: new Date(),
      },
      {
        name: "JLPT N2 Kanji List",
        description: "This deck contains all the N2 kanji",
        id: "4",
        author: "JP Learner",
        length: 20,
        dateCreated: new Date(),
      },
      {
        name: "JLPT N1 Kanji List",
        description: "This deck contains all the N1 kanji",
        id: "5",
        author: "JP Learner",
        length: 20,
        dateCreated: new Date(),
      },
    ]);
  }, []);
  return (
    <div className="m-auto max-w-5xl w-full flex flex-col rounded-lg mt-4 px-1.5">
      <p className="text-4xl text-center my-4">Home</p>
      <div className="flex">
        <Input placeholder="Search all decks..." />
        <Button className="ml-2">Search</Button>
      </div>
      <p className="text-2xl text-center mt-4">Newest</p>
      <div className="flex flex-row flex-wrap justify-around">
        {decksRes.map((deck) => (
          <DeckCard deck={deck} />
        ))}
      </div>
    </div>
  );
}

export { type DeckInfo };
export default DeckViewList;
