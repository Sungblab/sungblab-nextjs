import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient, Db } from "mongodb";

let cachedDb: Db | null = null;

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }

  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined");
  }

  const client = await MongoClient.connect(process.env.MONGODB_URI);
  const db = client.db(process.env.MONGODB_DB);
  cachedDb = db;
  return db;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const db = await connectToDatabase();

    if (req.method === "GET") {
      const postSlug = req.query.postSlug;
      if (!postSlug || typeof postSlug !== "string") {
        return res.status(400).json({ error: "Invalid postSlug" });
      }

      const comments = await db
        .collection("comments")
        .find({ postSlug })
        .sort({ createdAt: -1 })
        .toArray();
      return res.status(200).json(comments);
    } else if (req.method === "POST") {
      const { postSlug, name, content } = req.body;
      if (!postSlug || !name || !content) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const newComment = {
        postSlug,
        name,
        content,
        createdAt: new Date().toISOString(),
      };
      await db.collection("comments").insertOne(newComment);
      return res.status(201).json(newComment);
    } else {
      return res.status(405).json({ error: "Method not allowed" });
    }
  } catch (error: unknown) {
    console.error("API error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    return res
      .status(500)
      .json({ error: "Internal Server Error", details: errorMessage });
  }
}
