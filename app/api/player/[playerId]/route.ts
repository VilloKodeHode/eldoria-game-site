import { MongoClient, ServerApiVersion } from "mongodb";
import { NextResponse } from "next/server";

if (!process.env.MONGODB_URI) {
  throw new Error("MONGODB_URI environment variable is not set");
}

const mongoClient = new MongoClient(process.env.MONGODB_URI?.toString(), {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export async function GET(
  req: Request,
  context : { params: { playerId: string } }
) {
  try {
    await mongoClient.connect();
    const db = mongoClient.db("eldoria-updating-database");
    const { playerId } = context.params;
    const player = await db.collection("players").findOne({ playerId });

    if (!player) {
      return NextResponse.json({ error: "Player not found" }, { status: 404 });
    }
    return NextResponse.json(player);
  } catch {
    NextResponse.json({ error: "Failed to fetch player" }, { status: 500 });
  } finally {
    await mongoClient.close();
  }
}
