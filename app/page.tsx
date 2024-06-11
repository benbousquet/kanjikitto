import { ReviewItem } from "@/components/types";
import KanjiDrawing from "../components/kanjiDrawing";
import { ArrowDown } from "lucide-react";
export default function Home() {
  const exampleItem: ReviewItem = {
    hiragana: "きょう",
    kanji: "今日",
    meaning: "Today",
  };
  return (
    <main>
      <div className="flex flex-col">
        <h1 className="text-5xl text-center font-extrabold py-5 flex-wrap">
          Start learning Kanji through writing!
        </h1>
        <h2 className="text-3xl text-center">
          <span className="bg-yellow-100">Try it out below</span>
        </h2>
        <div className="flex flex-row justify-center animate-bounce">
          <ArrowDown />
        </div>
        <KanjiDrawing word={exampleItem} nextItem={null} />
      </div>
    </main>
  );
}
