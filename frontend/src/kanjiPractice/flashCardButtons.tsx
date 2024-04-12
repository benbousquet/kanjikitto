import { AnswerStates } from "./kanjiPractice.types";
function FlashCardButtons({
  isShown,
  handleClick,
}: {
  isShown: boolean;
  handleClick: React.MouseEventHandler;
}) {
  return (
    <>
      {isShown ? (
        <div className="flex flex-row w-5/6 h-3/6">
          <button
            name={AnswerStates.wrong} // not sure if this is ok?
            className="border-2 rounded-lg bg-red-600 grow"
            onClick={handleClick}
          >
            Wrong
          </button>
          <button
            name={AnswerStates.correct}
            className="border-2 rounded-lg bg-green-600 grow"
            onClick={handleClick}
          >
            Correct
          </button>
        </div>
      ) : (
        <button
          className="border-2 w-5/6 h-3/6 rounded-lg bg-white"
          onClick={handleClick}
        >
          {isShown ? "Next" : "Show Answer"}
        </button>
      )}
    </>
  );
}

export default FlashCardButtons;
