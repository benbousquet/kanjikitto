import { useState } from "react";
import FlashCard from "./flashCard";

interface Card {
  front: string;
  back: string;
}

interface HistoryEntry {
  card: Card;
  answeredCorrect: boolean;
  date: Date;
}

interface SessionStatistics {
  answeredCorrect: number;
  totalAnswered: number;
}

function KanjiPractice() {
  const [currentCard, setCurrentCard] = useState(0);

  const [answerHistory, setAnswerHistory] = useState<HistoryEntry[]>([]);

  const testSet: { front: string; back: string }[] = [
    { front: "綺麗", back: "きれい" },
    { front: "優しい", back: "やさしい" },
    { front: "家", back: "いえ" },
    { front: "日本", back: "にほん" },
    { front: "可愛い", back: "かわいい" },
    { front: "甘い", back: "あまい" },
    { front: "赤い", back: "あかい" },
  ];

  const getStatistics = (): SessionStatistics => {
    let totalCorrect = 0;
    for (const answer of answerHistory) {
      if (answer.answeredCorrect) {
        totalCorrect++;
      }
    }
    return {
      answeredCorrect: totalCorrect,
      totalAnswered: answerHistory.length,
    };
  };

  console.log(answerHistory);

  const nextClick = (answeredCorrect: boolean) => {
    console.log(answeredCorrect);
    if (testSet.length - 1 > currentCard) {
      setAnswerHistory([
        ...answerHistory,
        {
          card: testSet[currentCard],
          answeredCorrect: answeredCorrect,
          date: new Date(),
        },
      ]);
      setCurrentCard((prev) => {
        return prev + 1;
      });
    }
  };

  return (
    <div className="flex flex-col items-center h-screen">
      <p className="text-2xl font-bold">Kanji Practice Module</p>
      <p className="text-xl">
        {getStatistics().answeredCorrect} / {getStatistics().totalAnswered}
      </p>
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
