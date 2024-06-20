import { auth } from "@/auth";
import db from "@/lib/db";
import { idSchema } from "@/lib/schema";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const session = await auth();

  if (!session?.user)
    return Response.json({ error: "Not Authorized" }, { status: 401 });

  const requestJSON = await request.json();

  try {
    const { id } = idSchema.parse(requestJSON);

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
    const deletedDeck = await db.deck.delete({
      where: {
        id: id,
        authorId: session.user.id
      },
    });

    return Response.json({ deletedDeck }, { status: 200 });
  } catch (err: any) {
    return new NextResponse("Request JSON Invalid");
  }
}
