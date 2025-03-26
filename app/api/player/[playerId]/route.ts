// import { MongoClient, ServerApiVersion } from "mongodb";
import { NextResponse, NextRequest } from "next/server";

// if (!process.env.MONGODB_URI) {
//   throw new Error("MONGODB_URI environment variable is not set");
// }

// const mongoClient = new MongoClient(process.env.MONGODB_URI?.toString(), {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });

// export async function GET(
//   req: NextRequest,
//   {params} : { params: { playerId: string } }
// ) {
//   const playerId  = params.playerId;
//   try {
//     await mongoClient.connect();
//     const db = mongoClient.db("eldoria-updating-database");
//     const player = await db.collection("players").findOne({ playerId });

//     if (!player) {
//       return NextResponse.json({ error: "Player not found" }, { status: 404 });
//     }
//     console.log("player found! Getting...")
//     return NextResponse.json(player);
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Failed to fetch player", details: error },
//       { status: 500 }
//     );
//   } finally {
//     await mongoClient.close();
//   }
// }

// post a check to the server:
 export async function POST(req: NextRequest) {
  const body = await req.json();
  return NextResponse.json(body);
}
