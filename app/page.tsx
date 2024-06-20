import { ReviewItem } from "@/components/types";
import KanjiDrawing from "../components/kanjiDrawing";
import { ArrowDown, Github, GraduationCap } from "lucide-react";
import Link from "next/link";
import { auth } from "@/auth";
export default async function Home() {
  const session = await auth();

  const exampleItem: ReviewItem = {
    hiragana: "きょう",
    kanji: "今日",
    definition: "Today",
  };
  return (
    <main>
      <div className="flex flex-col lg:flex-row max-w-fit lg:max-w-7xl mx-auto py-8 lg:py-24 lg:overflow-hidden">
        <div className="max-w-2xl text-center lg:text-left lg:mr-16 snap-center">
          <h1 className="text-5xl font-extrabold tracking-tight py-5 flex-wrap">
            Learn Kanji 漢字 through writing!
          </h1>
          <p className="text-xl leading-relaxed py-2 px-3 lg:px-0">
            Sometimes its hard to learn without doing, Kanji Kitto can help you
            learn Kanji through writing with automatic feedback from AI!
          </p>
          <div className="my-5 lg:my-14">
            <Link
              href={session ? "/dashboard" : "/api/auth/signin"}
              passHref={true}
            >
              <button className="btn btn-primary btn-wide">
                <GraduationCap />
                Start learning
              </button>
            </Link>
          </div>
          <div className="divider"></div>
          <p className="text-xl leading-relaxed py-2 px-3 lg:px-0">
            This project is open-source, if you are interested in contributing
            please checkout the projects GitHub.
          </p>
          <div className="my-5 lg:my-14">
            <Link
              href="https://github.com/benbousquet/kanjikitto"
              passHref={true}
            >
              <button className="btn btn-primary btn-wide">
                <Github />
                GitHub
              </button>
            </Link>
          </div>
        </div>
        <div className="snap-center">
          {/* <h2 className="text-3xl text-center">Try it out</h2>
          <div className="flex flex-row justify-center h-5 items-center">
            <ArrowDown />
          </div> */}
          <div className="stack [&>div]:rounded-2xl [&>div]:bg-neutral [&>div]:p-5">
            <div>
              <KanjiDrawing word={exampleItem} nextItem={null} />
            </div>
            <div>
              <KanjiDrawing word={exampleItem} nextItem={null} />
            </div>
            <div>
              <KanjiDrawing word={exampleItem} nextItem={null} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
