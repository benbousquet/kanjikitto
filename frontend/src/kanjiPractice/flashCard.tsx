import { MouseEvent, useState } from "react";
import FlashCardButtons from "./flashCardButtons";
import { AnswerStates } from "./kanjiPractice.types";

function FlashCard({
  front,
  back,
  cb,
}: {
  front: string;
  back: string;
  cb: (answeredCorrect: boolean) => void;
}) {
  const [isShown, setIsShown] = useState(false);

  const handleClick = (e: MouseEvent) => {
    const answer: AnswerStates.correct | AnswerStates.wrong = (e.target as HTMLElement).id as AnswerStates; // also not sure if this is ok..
    if (!isShown) {
      setIsShown(true);
      return;
    }
    if (answer == AnswerStates.correct) {
      cb(true);
    } else {
      cb(false);
    }
    setIsShown(false);
  };

  return (
    <div className="flex flex-col bg-white border-2 min-w-80 max-w-96 rounded-lg items-center m-6">
      <div className="flex flex-col h-96 items-center text-gray-600">
        <p className="text-4xl p-5">{front}</p>
        <p className="text-2xl p-4">{isShown ? back : ""}</p>
      </div>
      <FlashCardButtons isShown={isShown} handleClick={handleClick} />
    </div>
  );
}

export default FlashCard;
