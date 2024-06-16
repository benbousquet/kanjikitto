import KanjiReview from "./_components/kanjiReview";
import { ReviewItem } from "@/components/types";

export default function Review() {
  const reviewData: ReviewItem[] = [
    { hiragana: "おいしい", kanji: "美味しい", meaning: "Delicious" },
    { hiragana: "にち", kanji: "日", meaning: "Sun" },
    { hiragana: "かいしゃ", kanji: "会社", meaning: "Company" },
    { hiragana: "さくぶん", kanji: "作文", meaning: "An essay; Composition" },
  ];
  return (
    <main>
      <div className="lg:flex-row max-w-fit lg:max-w-7xl mx-auto py-8 lg:py-24">
        <KanjiReview reviewData={reviewData} />
      </div>
    </main>
  );
}
