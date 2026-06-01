import { compare, hash } from "bcryptjs";
import { ObjectId } from "mongodb";
import { getDb } from "@/lib/mongodb";
import { decryptTotpSecret, encryptTotpSecret } from "@/lib/totp-crypto";
import { verify } from "otplib";

export type AdminUserDoc = {
  _id: ObjectId;
  email: string;
  name: string;
  passwordHash: string;
  role: "admin";
  totpEnabled: boolean;
  totpSecret?: string;
  totpPendingSecret?: string;
  createdAt: Date;
  updatedAt: Date;
};

export function normalizeAdminEmail(email: string): string {
  return email.trim().toLowerCase();
}

export async function findAdminUserByEmail(email: string): Promise<AdminUserDoc | null> {
  const db = await getDb();
  const doc = await db.collection<AdminUserDoc>("admin_users").findOne({
    email: normalizeAdminEmail(email),
  });
  return doc;
}

export async function findAdminUserById(id: string): Promise<AdminUserDoc | null> {
  if (!ObjectId.isValid(id)) return null;
  const db = await getDb();
  return db.collection<AdminUserDoc>("admin_users").findOne({ _id: new ObjectId(id) });
}

export async function verifyAdminUserPassword(user: AdminUserDoc, plain: string): Promise<boolean> {
  return compare(plain, user.passwordHash);
}

export async function verifyAdminUserTotp(user: AdminUserDoc, token: string): Promise<boolean> {
  if (!user.totpEnabled || !user.totpSecret) return false;
  const code = token.replace(/\s/g, "");
  if (!/^\d{6}$/.test(code)) return false;
  try {
    const secret = decryptTotpSecret(user.totpSecret);
    const result = await verify({ secret, token: code });
    return result.valid === true;
  } catch {
    return false;
  }
}

export async function verifyPendingTotp(user: AdminUserDoc, token: string): Promise<boolean> {
  if (!user.totpPendingSecret) return false;
  const code = token.replace(/\s/g, "");
  if (!/^\d{6}$/.test(code)) return false;
  try {
    const secret = decryptTotpSecret(user.totpPendingSecret);
    const result = await verify({ secret, token: code });
    return result.valid === true;
  } catch {
    return false;
  }
}

export async function createAdminUser(input: {
  email: string;
  name: string;
  password: string;
}): Promise<{ _id: string }> {
  const email = normalizeAdminEmail(input.email);
  const db = await getDb();
  const existing = await db.collection("admin_users").findOne({ email });
  if (existing) {
    throw new Error("A user with this email already exists");
  }
  const now = new Date();
  const passwordHash = await hash(input.password, 12);
  const r = await db.collection("admin_users").insertOne({
    email,
    name: input.name.trim(),
    passwordHash,
    role: "admin",
    totpEnabled: false,
    createdAt: now,
    updatedAt: now,
  });
  return { _id: String(r.insertedId) };
}

export async function listAdminUsers(): Promise<
  { _id: string; email: string; name: string; totpEnabled: boolean; createdAt: string }[]
> {
  const db = await getDb();
  const list = await db
    .collection<AdminUserDoc>("admin_users")
    .find()
    .sort({ email: 1 })
    .limit(200)
    .toArray();
  return list.map((u) => ({
    _id: String(u._id),
    email: u.email,
    name: u.name,
    totpEnabled: u.totpEnabled,
    createdAt: u.createdAt.toISOString(),
  }));
}

export async function setTotpPendingSecret(userId: string, plainSecret: string): Promise<void> {
  const db = await getDb();
  await db.collection("admin_users").updateOne(
    { _id: new ObjectId(userId) },
    {
      $set: {
        totpPendingSecret: encryptTotpSecret(plainSecret),
        updatedAt: new Date(),
      },
    },
  );
}

export async function activateTotp(userId: string): Promise<void> {
  const user = await findAdminUserById(userId);
  if (!user?.totpPendingSecret) {
    throw new Error("No pending MFA setup");
  }
  const db = await getDb();
  await db.collection("admin_users").updateOne(
    { _id: new ObjectId(userId) },
    {
      $set: {
        totpSecret: user.totpPendingSecret,
        totpEnabled: true,
        updatedAt: new Date(),
      },
      $unset: { totpPendingSecret: "" },
    },
  );
}

export async function disableTotp(userId: string): Promise<void> {
  const db = await getDb();
  await db.collection("admin_users").updateOne(
    { _id: new ObjectId(userId) },
    {
      $set: { totpEnabled: false, updatedAt: new Date() },
      $unset: { totpSecret: "", totpPendingSecret: "" },
    },
  );
}

export async function checkCredentialsForLogin(
  email: string,
  password: string,
): Promise<{ ok: true; requiresMfa: boolean } | { ok: false }> {
  const user = await findAdminUserByEmail(email);
  if (!user) return { ok: false };
  if (!(await verifyAdminUserPassword(user, password))) return { ok: false };
  return { ok: true, requiresMfa: user.totpEnabled };
}
