import { auth } from "@/auth";
import db from "@/lib/db";
import { deckFormSchema } from "@/lib/deckForm";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const session = await auth();

  if (!session?.user)
    return Response.json({ error: "Not Authorized" }, { status: 401 });

  const requestJSON = await request.json();

  try {
    const { id, name, description, cards } = deckFormSchema.parse(requestJSON);

    const deck = await db.deck.findUnique({
      where: {
        id,
        authorId: session.user.id,
      },
    });

    if (!deck) {
      return Response.json(
        { message: "Deck not accessible or found" },
        { status: 400 }
      );
    }

    // delete all cards on deck
    await db.card.deleteMany({
      where: {
        deckId: id,
      },
    });

    const updatedDeck = await db.deck.update({
      where: {
        id,
        authorId: session.user.id,
      },
      data: {
        title: name,
        description,
        cards: {
          create: [...cards],
        },
      },
      include: {
        cards: true,
      },
    });

    if (!updatedDeck) {
      return Response.json(
        { message: "Error when updating deck" },
        { status: 500 }
      );
    }

    return Response.json({ updatedDeck }, { status: 200 });
  } catch (err: any) {
    return new NextResponse("Request JSON Invalid");
  }
}
