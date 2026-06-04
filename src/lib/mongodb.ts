import { MongoClient, type Db } from "mongodb";

const uri = process.env.MONGODB_URI;
let client: MongoClient | null = null;
let clientPromise: Promise<MongoClient> | null = null;

function getClient(): Promise<MongoClient> {
  if (!uri) {
    throw new Error("MONGODB_URI is not set");
  }
  if (clientPromise) return clientPromise;
  client = new MongoClient(uri);
  clientPromise = client.connect();
  return clientPromise;
}

let indexesReady = false;

export async function getDb(): Promise<Db> {
  const c = await getClient();
  const name = process.env.MONGODB_DB ?? "mkf_foundation";
  const db = c.db(name);
  if (!indexesReady) {
    try {
      await ensureDbIndexesOn(db);
    } catch {
      /* first connection */
    }
    indexesReady = true;
  }
  return db;
}

export async function ensureDbIndexesOn(db: Db) {
  await db.collection("events").createIndex({ slug: 1 }, { unique: true, sparse: true });
  await db.collection("events").createIndex({ useForDonate: 1 });
  await db.collection("events").createIndex({ startDate: 1 });
  await db.collection("categories").createIndex({ slug: 1 }, { unique: true, sparse: true });
  await db.collection("gallery_items").createIndex({ eventId: 1, categoryId: 1, order: 1 });
  await db.collection("admin_users").createIndex({ email: 1 }, { unique: true });
  await db.collection("testimonials").createIndex({ slug: 1 }, { unique: true, sparse: true });
  await db.collection("testimonials").createIndex({ published: 1, order: 1 });
  await db.collection("newsletter_subscribers").createIndex({ email: 1 }, { unique: true });
  await db.collection("newsletter_subscribers").createIndex({ subscribed: 1, updatedAt: -1 });
  await db.collection("form_submissions").createIndex({ type: 1, createdAt: -1 });
  await db.collection("form_submissions").createIndex({ email: 1, createdAt: -1 });
}
