import { connectToDatabase } from "@/app/lib/mongoDB/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { itemId } = await req.json(); // the _id of the crafted item
    const db = await connectToDatabase();
    const players = db?.collection("players");

    const player = await players?.findOne({ userId });

    if (!player) {
      return NextResponse.json({ error: "Player not found" }, { status: 404 });
    }

    // Avoid duplicates
    await players?.updateOne(
      { userId },
      {
        $addToSet: { learnedRecipes: itemId }, // Only adds if not already present
      }
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Failed to update learnedRecipes:", err);
    return NextResponse.json(
      { error: "Failed to update recipe" },
      { status: 500 }
    );
  }
}
