import { auth } from "@/auth";
import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const session = await auth();

  if (!session?.user)
    return Response.json({ error: "Not Authorized" }, { status: 401 });

  try {
    // add deck
    await db.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        decks: {
          create: {
            title: "My New Deck",
            description: "This is a cool description!",
          },
        },
      },
      include: {
        decks: true,
      },
    });

    const deck = await db.deck.findFirst({
      where: {
        authorId: session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    if (deck) {
      return Response.json({ deck }, { status: 200 });
    }
    return Response.json({ error: "Could not create deck" }, { status: 500 });
  } catch (err: any) {
    return new NextResponse("Request JSON Invalid");
  }
}
