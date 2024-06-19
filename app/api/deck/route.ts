import { auth } from "@/auth";
import db from "@/lib/db";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const session = await auth();

  if (!session?.user)
    return Response.json({ error: "Not Authorized" }, { status: 401 });

  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");
  if (!id || parseInt(id) === Number.NaN) {
    return Response.json({ error: "Invalid id provided" }, { status: 400 });
  }

  try {
    const deck = await db.deck.findFirst({
      where: {
        id: parseInt(id),
        // authorId: session.user.id,
      },
    });

    if (deck) {
      if (deck.private && deck.authorId !== session.user.id) {
        return Response.json({ error: "Deck not accessible" }, { status: 400 });
      }
      return Response.json({ deck }, { status: 200 });
    }
    return Response.json({ error: "Deck not found" }, { status: 400 });

  } catch (err: any) {
    return Response.json({ error: "Deck not found" }, { status: 400 });
  }
}
