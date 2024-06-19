import { auth } from "@/auth";
import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const session = await auth();

  if (!session?.user)
    return Response.json({ error: "Not Authorized" }, { status: 401 });

  // const requestJSON = await request.json();

  try {
    // const { name, description, cards } = deckFormSchema.parse(requestJSON);

    const user = await db.user.update({
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

    // // So bad :(
    // let maxId = -1;

    // await user.decks.forEach((deck) => {
    //   if (deck.id > maxId) maxId = deck.id;
    // });

    // const deck = await db.deck.update({
    //   where: {
    //     id: maxId,
    //   },
    //   data: {
    //     cards: {
    //       create: cards,
    //     },
    //   },
    //   include: {
    //     cards: true,
    //   },
    // });

    return Response.json({ user }, { status: 200 });
  } catch (err: any) {
    return new NextResponse("Request JSON Invalid");
  }
}
