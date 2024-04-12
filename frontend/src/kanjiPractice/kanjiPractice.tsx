import { useState } from "react";
import FlashCard from "./flashCard";

function KanjiPractice() {
  const [currentCard, setCurrentCard] = useState(0);

  const testSet: { front: string; back: string }[] = [
    { front: "綺麗", back: "きれい" },
    { front: "優しい", back: "やさしい" },
    { front: "家", back: "いえ" },
    { front: "日本", back: "にほん" },
    { front: "可愛い", back: "かわいい" },
    { front: "甘い", back: "あまい" },
    { front: "赤い", back: "あかい" },
  ];

  const nextClick = () => {
    if (testSet.length - 1 > currentCard) {
      console.log(testSet.length, currentCard);
      setCurrentCard((prev) => prev + 1);
    }
  };

  return (
    <div className="flex flex-col items-center h-screen">
      <p className="text-2xl font-bold">Kanji Practice Module</p>
      <div className="flex grow items-center">
        <FlashCard
          front={testSet[currentCard].front}
          back={testSet[currentCard].back}
          cb={nextClick}
        />
      </div>
      {testSet.length - 1 === currentCard && <p>Finished</p>}
    </div>
  );
}

export default KanjiPractice;
