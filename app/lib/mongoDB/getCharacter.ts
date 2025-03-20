import { auth } from "@clerk/nextjs/server";
import { connectToDatabase } from "./db";


export async function getCharacter() {
    const {userId} = await auth()

    if (!userId) return null;

    const db = await connectToDatabase()

    if (!db) return null

    const character = await db.collection("players").findOne({userId})

    return character ? JSON.parse(JSON.stringify(character)) : null
}