import db from "@/lib/db";
import KanjiReview from "../_components/kanjiReview";
import { CircleX } from "lucide-react";
import { auth } from "@/auth";

export default async function Review({ params }: { params: { id: string } }) {
  const session = await auth();

  if (!session || session === undefined) {
    return (
      <div className="flex flex-col items-center max-w-fit lg:max-w-7xl mx-auto py-8 lg:py-24 text-left">
        <div role="alert" className="alert alert-error">
          <CircleX />
          <span>Error! You need to be logged in to access this page.</span>
        </div>
      </div>
    );
  }
  const id = parseInt(params.id);

  if (!id || id === Number.NaN) {
    return (
      <div className="flex flex-col items-center max-w-fit lg:max-w-7xl mx-auto py-8 lg:py-24 text-left">
        <div role="alert" className="alert alert-error">
          <CircleX />
          <span>Error! Deck id invalid.</span>
        </div>
      </div>
    );
  }

  const deck = await db.deck.findUnique({
    where: {
      id,
    },
    include: {
      cards: true,
    },
  });

  if (deck) {
    if (deck.private && deck.authorId !== session.user?.id) {
      return (
        <div className="flex flex-col items-center max-w-fit lg:max-w-7xl mx-auto py-8 lg:py-24 text-left">
          <div role="alert" className="alert alert-error">
            <CircleX />
            <span>Error! This deck is private.</span>
          </div>
        </div>
      );
    }
    return (
      <main>
        <div className="lg:flex-row max-w-fit lg:max-w-7xl mx-auto py-8 lg:py-24">
          {deck.cards.length > 0 ? (
            <KanjiReview reviewData={deck.cards} />
          ) : (
            <h2>This deck is empty :(</h2>
          )}
        </div>
      </main>
    );
  } else {
    return (
      <div className="flex flex-col items-center max-w-fit lg:max-w-7xl mx-auto py-8 lg:py-24 text-left">
        <div role="alert" className="alert alert-error">
          <CircleX />
          <span>Error! Deck does not exist.</span>
        </div>
      </div>
    );
  }
}
