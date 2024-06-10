import KanjiReview from "@/components/kanjiReview";
import { ReviewItem } from "@/components/types";

export default function Review() {
  const reviewData: ReviewItem[] = [
    { hiragana: "おいしい", kanji: "美味しい", meaning: "Delicious" },
    { hiragana: "にち", kanji: "日", meaning: "Sun" },
    { hiragana: "かいしゃ", kanji: "会社", meaning: "Company" },
    { hiragana: "さくぶん", kanji: "作文", meaning: "An essay; Composition" },
  ]
  return (
    <main>
      <KanjiReview reviewData={reviewData} />
    </main>
  );
}
