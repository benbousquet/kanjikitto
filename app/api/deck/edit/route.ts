import { auth } from "@/auth";
import db from "@/lib/db";
import { deckFormSchema } from "@/lib/schema";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  console.log("edit post");
  const session = await auth();

  if (!session?.user)
    return Response.json({ error: "Not Authorized" }, { status: 401 });

  const requestJSON = await request.json();

  try {
    // const { id, title, description, cards } = deckFormSchema.parse(requestJSON);
    const res = deckFormSchema.safeParse(requestJSON);
    if (!res.success) {
      console.log(res.error.errors);
      return Response.json({ error: "Invalid form data", errors: res.error.errors }, { status: 400 });
    }

    const {id, title, description, cards} = res.data!

    const deck = await db.deck.findUnique({
      where: {
        id,
        authorId: session.user.id,
      },
    });

    if (!deck) {
      return Response.json(
        { error: "Deck not accessible or found" },
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
        title,
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
        { error: "Error when updating deck" },
        { status: 500 }
      );
    }

    return Response.json({ updatedDeck }, { status: 200 });
  } catch (err: any) {
    return new NextResponse("Request JSON Invalid");
  }
}
