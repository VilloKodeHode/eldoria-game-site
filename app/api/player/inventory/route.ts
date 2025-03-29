// /api/player/inventory/route.ts
import { auth } from "@clerk/nextjs/server";
import { connectToDatabase } from "@/app/lib/mongoDB/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const { userId } = await auth();
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const db = await connectToDatabase();
  const player = await db?.collection("players").findOne({ userId });

  if (!player)
    return NextResponse.json({ error: "Player not found" }, { status: 404 });

  return NextResponse.json({
    items: player.inventory?.items ?? [],
    currency: player.inventory?.currency ?? { gold: 0, gems: 0 },
    learnedRecipes: player.learnedRecipes ?? [],
  });
}

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { itemId, amount = 1 } = await req.json();
  if (!itemId)
    return NextResponse.json({ error: "Missing itemId" }, { status: 400 });

  const db = await connectToDatabase();
  const players = db?.collection("players");

  if (!players)
    return NextResponse.json(
      { error: "Database connection error" },
      { status: 500 }
    );

  const result = await players.updateOne(
    { userId, "inventory.items.sanityId": itemId },
    {
      $inc: { "inventory.items.$.amount": amount },
    }
  );

  if (result.matchedCount === 0) {
    // Item not found, push new one
    await players.updateOne(
      { userId },
      {
        $push: {
          "inventory.items": {
            sanityId: itemId,
            amount,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } as any,
        },
      }
    );
  }

  return NextResponse.json({ message: "Item added/updated in inventory" });
}
