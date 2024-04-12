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
    const answer: AnswerStates.correct | AnswerStates.wrong = e.target.name; // also not sure if this is ok..
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
    <div className="flex flex-col bg-gray-600 w-80 h-96 pt-5 pb-5 rounded-lg items-center">
      <div className="flex flex-col h-4/6 items-center text-white">
        <p>{front}</p>
        <p>{isShown ? back : ""}</p>
      </div>
      <FlashCardButtons isShown={isShown} handleClick={handleClick} />
    </div>
  );
}

export default FlashCard;
