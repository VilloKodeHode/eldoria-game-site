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
    currency: player.currency ?? { gold: 0, gems: 0 }, // ✅ use top-level currency
    learnedRecipes: player.learnedRecipes ?? [],
  });
}

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { itemId, itemType = "misc", amount = 1, gold = 0 } = await req.json();
  if (!itemId || amount < 1) return NextResponse.json({ error: "Missing itemId or invalid amount" }, { status: 400 });

  const db = await connectToDatabase();
  const players = db?.collection("players");
  if (!players) return NextResponse.json({ error: "Database connection error" }, { status: 500 });

  // 1. Deduct gold from player
  const updateGoldResult = await players.updateOne(
    { userId, "currency.gold": { $gte: gold } },
    { $inc: { "currency.gold": -gold } }
  );

  if (updateGoldResult.modifiedCount === 0) {
    return NextResponse.json({ error: "Not enough gold" }, { status: 400 });
  }

  // 2. Try to increment item if it exists
  const result = await players.updateOne(
    { userId, "inventory.items.sanityId": itemId },
    { $inc: { "inventory.items.$.amount": amount } }
  );

  // 3. If item not found, push it into array
  if (result.matchedCount === 0) {
    const newItem = {
      sanityId: itemId,
      amount,
      type: itemType,
    };

    await players.updateOne(
      { userId },
      {
        // @ts-expect-error: TS doesn't support deeply nested $push
        $push: {
          "inventory.items": newItem,
        },
        $setOnInsert: {
          currency: { gold: 0, gems: 0 }, // in case user is newly created
        },
      },
      { upsert: true }
    );
  }

  return NextResponse.json({ message: "Item purchased successfully" });
}
