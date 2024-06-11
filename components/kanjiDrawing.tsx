"use client";
import useDoodle from "./useDoddle";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Eraser } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { ReviewItem } from "./types";

type LetterInfo = {
  letter: string;
  dataURI: string | undefined;
  predictions: [string] | [];
  corrected: boolean;
};

export default function KanjiDrawing({
  word,
  nextItem,
}: {
  word: ReviewItem;
  nextItem: (() => void) | null;
}) {
  const { hiragana, kanji, meaning } = word;

  const [undo, clear, getImg] = useDoodle(word);
  const [letters, setLetters] = useState<LetterInfo[]>([]);
  const [currLetter, setCurrLetter] = useState<number>(0);
  const canvasRef = useRef(null);

  useEffect(() => {
    let baseAnswerObj: LetterInfo[] = [];
    kanji.split("").forEach((letter) => {
      baseAnswerObj.push({
        letter,
        dataURI: undefined,
        predictions: [],
        corrected: false,
      });
    });
    setLetters(baseAnswerObj);
  }, [word]);

  function calculateBorderStyle(letterObj: LetterInfo, i: number): string {
    if (i === currLetter) {
      return "border-solid border-b-4 border-blue-500";
    }
    if (letterObj.dataURI === undefined) {
      return "";
    }
    // so jank need to find new solution
    if (letterObj.corrected) {
      if (letterObj.letter === letterObj.predictions[0]) {
        return "border-solid border-b-4 border-rose-500";
      }
      return "border-solid border-b-4 border-green-500";
    }

    if (letterObj.letter !== letterObj.predictions[0]) {
      return "border-solid border-b-4 border-rose-500";
    }
    return "border-solid border-b-4 border-green-500";
  }

  function addAnswer(predictions: [string]) {
    if (letters === undefined) {
      return;
    }
    const newLettersArr = [...letters];
    newLettersArr[currLetter].dataURI = getImg();
    newLettersArr[currLetter].predictions = predictions;
    setLetters(newLettersArr);
    setCurrLetter(currLetter + 1);
  }

  function isDone(): boolean {
    if (letters.length === 0) return false;
    return currLetter === letters!.length;
  }

  function correctAnswer(i: number) {
    if (!isDone()) {
      return;
    }
    const newLettersArr = [...letters];
    newLettersArr[i].corrected = !newLettersArr[i].corrected;
    setLetters(newLettersArr);
  }

  function clearReviewData() {
    setCurrLetter(0);
    setLetters([]);
    clear();
  }

  function endScreen() {
    if (nextItem) {
      return (
        <Button className="rounded-full" size="lg">
          <p
            className="text-xl"
            onClick={() => {
              nextItem();
              clear();
              clearReviewData();
            }}
          >
            Next Word
          </p>
          <ArrowRight />
        </Button>
      );
    }
    const score = letters.reduce((acc, letter) => {
      if (letter.letter === letter.predictions[0]) {
        return acc + 1;
      }
      return acc;
    }, 0);
    return <h4 className="text-3xl">You scored {score}/{letters.length} for this Kanji!</h4>;
  }

  function showHint() {
    return (
        <p className="text-center text-xl">Hint: draw "{letters[currLetter]?.letter}"</p>
    )
  }

  return (
    <>
      <div>
        <h4 className="text-lg text-center pt-5">
          {isDone()
            ? "Tap on boxes to correct incorrectly marked answers."
            : "Write the Hiragana as Kanji!"}
        </h4>
        <h1 className="text-4xl font-extrabold text-center py-5">{hiragana}</h1>
        <h2 className="text-xl text-center">It means "{meaning}"</h2>
      </div>

      <div className="flex flex-row flex-wrap space-x-4 justify-center py-4">
        {letters?.map((letterObj, i) => {
          return letterObj.dataURI === undefined ? (
            <div
              className={
                "border-solid border-4" + calculateBorderStyle(letterObj, i)
              }
              key={i}
            >
              <div className="w-16 h-16 bg-white flex justify-center items-center"></div>
            </div>
          ) : (
            <div key={i}>
              <img
                src={letterObj.dataURI}
                className={"w-16 pb-1 " + calculateBorderStyle(letterObj, i)}
                onMouseDown={() => correctAnswer(i)}
              ></img>
              {/* {isDone() && ( might add stroke order later
                <img src={"/19978.svg"} key={i} className="w-16"></img>
              )} */}
            </div>
          );
        })}
      </div>
      {isDone() && (
        <div className="mt-16 mb-10">
          {/* <Separator className="mb-5" /> */}
          <h4 className="text-2xl text-center">Correct Answer</h4>
          <h1 className="text-5xl font-extrabold text-center">{kanji}</h1>
        </div>
      )}
      {(!nextItem && !isDone()) && showHint()}
      <canvas
        id="doodleCanvas"
        className={"border-4 my-4 max-w-xl mx-auto " + (isDone() && "hidden")}
      ></canvas>
      <div className="flex flex-row [&>button]:mx-2 py-2 justify-evenly">
        {isDone() ? (
          endScreen()
        ) : (
          <div className="[&>button:first-child]:mr-28">
            <Button className="rounded-full" size="lg" onMouseDown={clear}>
              <Eraser />
            </Button>
            <Button
              className="rounded-full"
              size="lg"
              onMouseDown={async () => {
                const classify = await fetch("/api/classify", {
                  method: "POST",
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ imgDataURI: getImg() }),
                });
                const resJSON = await classify.json();
                const predictions = resJSON.results.predictions;
                addAnswer(predictions);
                clear();
              }}
            >
              <Check />
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
