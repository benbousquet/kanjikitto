"use client";
import { useState } from "react";
import KanjiDrawing from "@/components/kanjiDrawing";
import { Card } from "@prisma/client";

export default function KanjiReview({
  reviewData,
}: {
  reviewData: Card[];
}) {
  const [currentItemIdx, setCurrentItemIdx] = useState(0);

  function nextItem() {
    if (currentItemIdx === reviewData.length - 1) {
      return;
    }
    setCurrentItemIdx(currentItemIdx + 1);
  }

  return (
    <div className="flex flex-col mx-auto">
      <div>
        <p className="text-xl text-right pr-4 font-bold">{reviewData.length - currentItemIdx} Left</p>
      </div>
      <KanjiDrawing word={reviewData[currentItemIdx]} nextItem={nextItem} />
    </div>
  );
}
