import db from "@/lib/db";
import EditForm from "../_components/editForm";
import { auth } from "@/auth";
import { CircleX } from "lucide-react";

export default async function Edit({ params }: { params: { id: string } }) {
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

  // check if user owns deck
  const deck = await db.deck.findFirst({
    where: {
      id: parseInt(params.id),
      authorId: session?.user?.id,
    },
    include: {
      cards: true
    }
  });

  return (
    <div className="flex flex-col items-center max-w-fit lg:max-w-7xl mx-auto py-8 lg:py-24 text-left">
      <h1 className="text-4xl lg:text-6xl">Create Deck</h1>
      {deck ? (
        <EditForm deck={deck} />
      ) : (
        <div role="alert" className="alert alert-error my-5">
          <CircleX />
          <span>Error! You are not the author of this deck.</span>
        </div>
      )}
    </div>
  );
}
