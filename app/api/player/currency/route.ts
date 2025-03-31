import { auth } from "@clerk/nextjs/server";
import { connectToDatabase } from "@/app/lib/mongoDB/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { gold = 0, gems = 0 } = await req.json();

  const db = await connectToDatabase();
  const players = db?.collection("players");

  if (!players) {
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }

  const result = await players.updateOne(
    { userId },
    {
      $inc: {
        "inventory.currency.gold": gold,
        "inventory.currency.gems": gems,
      },
    }
  );

  if (result.modifiedCount === 0) {
    return NextResponse.json({ error: "Player not found or no change" }, { status: 404 });
  }

  return NextResponse.json({ message: "Currency updated" });
}
