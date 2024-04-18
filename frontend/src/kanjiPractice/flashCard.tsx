import { MouseEvent, useState } from "react";
import FlashCardButtons from "./flashCardButtons";
import { AnswerStates } from "./kanjiPractice.types";
import KanjiInfo from "./kanjiInfo";

type KanjiInfo = {
  shown: boolean;
  word: string;
  key: number;
};

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

  const [kanjiInfoState, setKanjiInfoState] = useState<KanjiInfo>({
    shown: false,
    word: "",
    key: -1,
  });

  const handleClick = (e: MouseEvent) => {
    const answer: AnswerStates.correct | AnswerStates.wrong = (
      e.target as HTMLElement
    ).id as AnswerStates; // also not sure if this is ok..
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

  const handleHover = (e: MouseEvent, key: number) => {
    console.log(e.type);
    if (e.type === "mouseenter") {
      setKanjiInfoState({
        shown: true,
        word: (e.target as HTMLElement).id,
        key,
      });
    } else if (e.type === "mouseleave") {
      setKanjiInfoState({
        shown: false,
        word: "",
        key: -1,
      });

    }
  };

  const letter = (letter: string, key: number) => {
    return (
      <span
        className={`text-5xl inline ${
          key === kanjiInfoState.key && "bg-yellow-200"
        }`}
        id={letter}
        key={key}
        onMouseEnter={(e) => handleHover(e, key)}
        onMouseLeave={(e) => handleHover(e, key)}
      >
        {isShown ? letter : ""}
      </span>
    );
  };

  return (
    <div className="flex flex-col bg-white border-2 min-w-80 max-w-96 rounded-lg items-center m-6">
      <div className="flex flex-col h-96 items-center text-gray-600">
        <p className="text-4xl p-5">{front}</p>
        <div>
          {back.split("").map((l, index) => {
            return letter(l, index);
          })}
        </div>
        <KanjiInfo state={kanjiInfoState} />
      </div>
      <FlashCardButtons isShown={isShown} handleClick={handleClick} />
    </div>
  );
}

export { KanjiInfo };
export default FlashCard;
