import { connectToDatabase } from "@/app/lib/mongoDB/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const db = await connectToDatabase();
    const existingCharacter = await db
      ?.collection("players")
      .findOne({ userId: userId });

    if (existingCharacter) {
      return NextResponse.json({ message: "Character already exists" });
    }

    const { name, race, playerClass } = await req.json();

    const defaultCharacter = {
      userId,
      name,
      race,
      class: playerClass,
      level: 1,
      stats: {
        strength: 10,
        agility: 10,
        intelligence: 10,
        wisdom: 10,
        luck: 10,
        health: 100,
        mana: 50,
      },
      currency: {
        gold: 100,
        gems: 5,
      },
      inventory: {
        items: [],
      },
      equipped: {
        weapon: null,
        armor: null,
        accessory: null,
      },
      quests: [],
      location: {
        currentRegion: "Valeria",
        currentTown: "Eldoria",
        coordinates: { x: 0, y: 0 },
      },
    };
    await db?.collection("players").insertOne(defaultCharacter);
    return NextResponse.json({ message: "Character created successfully" });
  } catch {
    return NextResponse.json(
      { error: "Failed to create character" },
      { status: 500 }
    );
  }
}
