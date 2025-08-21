import { MongoClient, Db, Collection, Document } from "mongodb";

let db: Db;

export async function connectToDB() {
  const client = new MongoClient("mongodb://127.0.0.1:27017");
  await client.connect();
  db = client.db("admin"); 
  console.log("✅ Connected to MongoDB");
}

export function getCollection<T extends Document>(name: string): Collection<T> {
  return db.collection<T>(name);
}

//hii i am jeevs