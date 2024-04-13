import {
  ArrowUturnLeftIcon,
  ArrowUturnRightIcon,
} from "@heroicons/react/16/solid";
import { AnswerStates } from "./kanjiPractice.types";
function FlashCardButtons({
  isShown,
  handleClick,
}: {
  isShown: boolean;
  handleClick: React.MouseEventHandler;
}) {
  return (
    <div className="h-28 w-full flex flex-col items-center">
      {isShown ? (
        <div className="flex flex-row w-5/6 h-20">
          <button
            id={AnswerStates.wrong} // not sure if this is ok?
            className="border-2 rounded-lg bg-gray-200 m-2 h-14 grow"
            onClick={handleClick}
          >
            <div className="flex items-center justify-center">
              <ArrowUturnLeftIcon className="text-gray-600 h-5 w-5" />
              Wrong
            </div>
          </button>
          <button
            id={AnswerStates.correct}
            className="border-2 rounded-lg bg-gray-200 m-2 h-14 grow"
            onClick={handleClick}
          >
            <div className="flex items-center justify-center">
              Correct
              <ArrowUturnRightIcon className="text-gray-600 h-5 w-5" />
            </div>
          </button>
        </div>
      ) : (
        <button
          className="border-2 rounded-lg bg-gray-200 m-2 h-14 w-5/6"
          onClick={handleClick}
        >
          Show Answer
        </button>
      )}
    </div>
  );
}

export default FlashCardButtons;
