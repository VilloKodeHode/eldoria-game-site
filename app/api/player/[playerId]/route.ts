// import { MongoClient, ServerApiVersion } from "mongodb";
import { NextResponse, NextRequest } from "next/server";

// post a check to the server:
export async function POST(req: NextRequest) {
  const body = await req.json();
  return NextResponse.json(body);
}
