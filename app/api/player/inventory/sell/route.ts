import { auth } from "@clerk/nextjs/server";
import { connectToDatabase } from "@/app/lib/mongoDB/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { itemId, amount = 1, gold = 0 } = await req.json();

  if (!itemId || gold < 0)
    return NextResponse.json(
      { error: "Missing itemId or invalid gold value" },
      { status: 400 }
    );

  const db = await connectToDatabase();
  const players = db?.collection("players");
  if (!players)
    return NextResponse.json(
      { error: "Database not connected" },
      { status: 500 }
    );

  const player = await players.findOne({ userId });
  if (!player)
    return NextResponse.json({ error: "Player not found" }, { status: 404 });

  const itemIndex = player.inventory.items.findIndex(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (item: any) => item.sanityId === itemId
  );

  if (itemIndex === -1)
    return NextResponse.json(
      { error: "Item not in inventory" },
      { status: 404 }
    );

  const currentAmount = player.inventory.items[itemIndex].amount;
  if (currentAmount < amount)
    return NextResponse.json(
      { error: "Not enough items to sell" },
      { status: 400 }
    );

  if (currentAmount === amount) {
    // Remove item completely
    await players.updateOne(
      { userId },
      {
        // @ts-expect-error - TS doesn't like nested $pull
        $pull: { "inventory.items": { sanityId: itemId } },
        $inc: { "currency.gold": gold },
      }
    );
  } else {
    // Just reduce amount
    await players.updateOne(
      { userId, "inventory.items.sanityId": itemId },
      {
        $inc: {
          "inventory.items.$.amount": -amount,
          "currency.gold": gold,
        },
      }
    );
  }

  return NextResponse.json({ message: "Item sold successfully" });
}
