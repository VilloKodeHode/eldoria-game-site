// /api/devcheats/route.ts

import { auth } from "@clerk/nextjs/server";
import { connectToDatabase } from "@/app/lib/mongoDB/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { ingredientIds } = await req.json();
  if (!Array.isArray(ingredientIds) || ingredientIds.length === 0) {
    return NextResponse.json({ error: "Invalid ingredientIds" }, { status: 400 });
  }

  const db = await connectToDatabase();
  const players = db?.collection("players");
  if (!players) return NextResponse.json({ error: "Database error" }, { status: 500 });

  // Add gold and gems
  await players.updateOne(
    { userId },
    {
      $inc: {
        "currency.gold": 10000,
        "currency.gems": 1000,
      },
    }
  );

  // Step 1: Fetch player inventory to check which ingredients exist
  const player = await players.findOne({ userId });
  if (!player) return NextResponse.json({ error: "Player not found" }, { status: 404 });

  const existingItems = player.inventory?.items ?? [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const existingIds = new Set(existingItems.map((item: any) => item.sanityId));
// eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updates: any[] = [];

  for (const sanityId of ingredientIds) {
    if (existingIds.has(sanityId)) {
      updates.push(
        players.updateOne(
          { userId, "inventory.items.sanityId": sanityId },
          { $inc: { "inventory.items.$.amount": 50 } }
        )
      );
    } else {
      updates.push(
        players.updateOne(
          { userId },
          {
            // @ts-expect-error: deep nesting
            $push: {
              "inventory.items": {
                sanityId,
                amount: 50,
                type: "ingredient",
              },
            },
          }
        )
      );
    }
  }

  await Promise.all(updates);

  return NextResponse.json({ message: "Dev cheats applied successfully" });
}
