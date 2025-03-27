import { auth } from "@clerk/nextjs/server";
import { connectToDatabase } from "@/app/lib/mongoDB/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { itemId, itemType, amount = 1, gold = 0 } = await req.json();
  if (!itemId || !itemType)
    return NextResponse.json({ error: "Missing itemId or itemType" }, { status: 400 });

  const db = await connectToDatabase();

  // Reduce amount or remove item
  await db?.collection("players").updateOne(
    { userId, "inventory.items.sanityId": itemId },
    {
      $inc: {
        "inventory.items.$.amount": -amount,
        "currency.gold": gold,
      },
      
    }
  );
  await db?.collection("players").updateOne(
    {
      userId,
    },
    {
      $pull: {
        "inventory.items": {
          sanityId: itemId,
          amount: { $lte: 0 },
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any,
      },
    }
  );

  // Optionally: remove item if amount is zero (can be a follow-up cleanup script)

  return NextResponse.json({ message: "Item sold and gold added" });
}
