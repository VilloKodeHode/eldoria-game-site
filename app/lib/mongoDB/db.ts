import { MongoClient } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI as string;
const MONGODB_DB = "eldoria_game";

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI environment variable is not set");
}

const client = new MongoClient(MONGODB_URI);

export async function connectToDatabase() {
  try {
    await client.connect();
    return client.db(MONGODB_DB);
  } catch (err) {
    console.error(err);
  }
}
