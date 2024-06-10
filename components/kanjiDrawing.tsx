"use client";
import useDoodle from "./useDoddle";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  ArrowRight,
  Check,
  Eraser,
} from "lucide-react";
import { useEffect, useState } from "react";

type LetterInfo = {
  letter: string;
  dataURI: string | undefined;
  predictions: [string] | [];
  corrected: boolean;
};

export default function KanjiDrawing({
  word,
}: {
  word: { hiragana: string; kanji: string };
}) {
  const { hiragana, kanji } = word;

  const [undo, clear, getImg] = useDoodle();
  const [letters, setLetters] = useState<LetterInfo[]>([]);
  const [currLetter, setCurrLetter] = useState<number>(0);

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
  }, []);

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

  return (
    <div className="flex flex-col">
      <div>
        <p className="text-xl text-right pr-4 font-bold">5 Left</p>
      </div>
      <Separator />
      <div>
        <h4 className="text-lg text-center pt-5">
          {isDone()
            ? "Tap on boxes to correct incorrectly marked answers."
            : "Write the Hiragana as Kanji!"}
        </h4>
        <h1 className="text-4xl font-extrabold text-center pb-5">{hiragana}</h1>
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
      {isDone() ? (
        <div className="mt-16 mb-10">
          <Separator className="mb-5" />
          <h4 className="text-2xl text-center">Correct Answer</h4>
          <h1 className="text-5xl font-extrabold text-center">{kanji}</h1>
        </div>
      ) : (
          <canvas id="doodleCanvas" className="border-4 my-4 max-w-xl mx-auto"></canvas>
      )}
      <div className="flex flex-row [&>button]:mx-2 py-2 justify-evenly">
        {isDone() ? (
          <Button className="rounded-full" size="lg">
            <p className="text-xl">Next Word</p>
            <ArrowRight />
          </Button>
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
    </div>
  );
}
