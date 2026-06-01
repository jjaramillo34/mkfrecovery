/**
 * Create the first (or additional) admin user in MongoDB.
 *
 * Usage:
 *   node --env-file=.env scripts/create-admin-user.mjs email@example.com "Full Name" "password-at-least-12-chars"
 */
import { hash } from "bcryptjs";
import { MongoClient } from "mongodb";

const [emailArg, nameArg, passwordArg] = process.argv.slice(2);

if (!emailArg || !nameArg || !passwordArg) {
  console.error(
    'Usage: node --env-file=.env scripts/create-admin-user.mjs <email> "<name>" "<password>"',
  );
  process.exit(1);
}

const email = emailArg.trim().toLowerCase();
const name = nameArg.trim();
const password = passwordArg;

if (password.length < 12) {
  console.error("Password must be at least 12 characters.");
  process.exit(1);
}

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB ?? "mkf_foundation";

if (!uri) {
  console.error("MONGODB_URI is not set");
  process.exit(1);
}

const client = new MongoClient(uri);
try {
  await client.connect();
  const db = client.db(dbName);
  await db.collection("admin_users").createIndex({ email: 1 }, { unique: true });

  const existing = await db.collection("admin_users").findOne({ email });
  if (existing) {
    console.error(`User already exists: ${email}`);
    process.exit(1);
  }

  const now = new Date();
  const passwordHash = await hash(password, 12);
  const r = await db.collection("admin_users").insertOne({
    email,
    name,
    passwordHash,
    role: "admin",
    totpEnabled: false,
    createdAt: now,
    updatedAt: now,
  });

  console.log(`Created admin user ${email} (_id: ${r.insertedId})`);
  console.log("Sign in at /admin/login and enable MFA under Admin → Security & MFA.");
} finally {
  await client.close();
}
