import db from "@/lib/db";
import { CircleX, Info, OctagonAlert } from "lucide-react";
import { auth } from "@/auth";
import Link from "next/link";
import DeleteButton from "../_components/deleteButton";

export default async function Delete({ params }: { params: { id: string } }) {
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
      authorId: session.user?.id,
    },
  });

  if (deck) {
    return (
      <div className="flex flex-col items-center max-w-fit lg:max-w-7xl mx-auto py-8 lg:py-24 text-left">
        <div className="bg-neutral rounded-lg p-5 space-y-5 flex flex-col items-center m-5">
          <div className="flex flex-col items-center space-y-5">
            <OctagonAlert size={64} />
            <h2 className="text-2xl text-center">
              Are you sure you want to delete <span className="font-bold">{deck.title}</span>?
            </h2>
          </div>
          <div className="space-x-2 flex flex-row items-center">
            <Link className="btn btn-warning" href="/dashboard">
              Back
            </Link>
            <DeleteButton id={id}/>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col items-center max-w-fit lg:max-w-7xl mx-auto py-8 lg:py-24 text-left">
        <div role="alert" className="alert alert-error">
          <CircleX />
          <span>Error! Deck does not exist or authored by different user.</span>
        </div>
      </div>
    );
  }
}
