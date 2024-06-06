"use client";
import useDoodle from "./useDoddle";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  BoxSelect,
  Check,
  ChevronDown,
  CircleHelp,
  Eraser,
} from "lucide-react";
import { useEffect, useState } from "react";

type LetterInfo = {
  letter: string;
  dataURI: string | undefined;
  predictions: [string] | [];
};

export default function KanjiDrawing({
  word,
}: {
  word: { hiragana: string; kanji: string };
}) {
  const { hiragana, kanji } = word;

  const [undo, clear, getImg] = useDoodle();
  const [letters, setLetters] = useState<LetterInfo[]>();
  const [currLetter, setCurrLetter] = useState<number>(0);

  useEffect(() => {
    let baseAnswerObj: LetterInfo[] = [];
    kanji.split("").forEach((letter) => {
      baseAnswerObj.push({ letter, dataURI: undefined, predictions: [] });
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

  return (
    <div className="flex flex-col">
      <div>
        <p className="text-xl text-right pr-4 font-bold">5 Left</p>
      </div>
      <Separator />
      <div>
        <h1 className="text-4xl font-extrabold text-center py-5">{hiragana}</h1>
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
            <img
              src={letterObj.dataURI}
              key={i}
              className={"w-16 " + calculateBorderStyle(letterObj, i)}
            ></img>
          );
        })}
      </div>
      <canvas id="doodleCanvas" className="border-4 m-4"></canvas>
      <div className="flex flex-row [&>button]:mx-2 py-2 justify-evenly">
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
    </div>
  );
}
