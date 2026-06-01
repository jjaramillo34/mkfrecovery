"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type UserRow = {
  _id: string;
  email: string;
  name: string;
  totpEnabled: boolean;
  createdAt: string;
};

export function UsersManager() {
  const [rows, setRows] = useState<UserRow[] | null>(null);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const load = useCallback(() => {
    fetch("/api/admin/users")
      .then((r) => (r.ok ? r.json() : []))
      .then((d: UserRow[]) => setRows(Array.isArray(d) ? d : []))
      .catch(() => setErr("Failed to load users"));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function createUser(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    setErr(null);
    const r = await fetch("/api/admin/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, name, password }),
    });
    if (!r.ok) {
      const j = (await r.json().catch(() => ({}))) as { error?: string };
      setErr(typeof j.error === "string" ? j.error : "Could not create user");
      return;
    }
    setEmail("");
    setName("");
    setPassword("");
    setMsg("User created. Share the temporary password securely and ask them to enable MFA.");
    load();
  }

  if (rows === null) {
    return <p className="text-mkf-muted">Loading…</p>;
  }

  return (
    <div className="space-y-10">
      <section>
        <h2 className="font-display text-xl font-semibold text-mkf-ink">Add admin user</h2>
        <Card className="mt-3 p-5 sm:p-6">
          <form className="grid gap-3 sm:grid-cols-2" onSubmit={createUser}>
            <label>
              <span className="text-sm font-medium">Email</span>
              <input
                className="mt-1 w-full rounded-md border border-mkf-border bg-mkf-bg px-3 py-2 text-sm"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            <label>
              <span className="text-sm font-medium">Name</span>
              <input
                className="mt-1 w-full rounded-md border border-mkf-border bg-mkf-bg px-3 py-2 text-sm"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>
            <label className="sm:col-span-2">
              <span className="text-sm font-medium">Temporary password (min. 12 characters)</span>
              <input
                className="mt-1 w-full rounded-md border border-mkf-border bg-mkf-bg px-3 py-2 text-sm"
                type="password"
                autoComplete="new-password"
                minLength={12}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            <div className="sm:col-span-2">
              <Button type="submit" variant="primary">
                Create user
              </Button>
            </div>
          </form>
        </Card>
        {msg && <p className="mt-2 text-sm text-mkf-teal">{msg}</p>}
        {err && <p className="mt-2 text-sm text-red-600">{err}</p>}
      </section>

      <section>
        <h2 className="font-display text-xl font-semibold text-mkf-ink">Existing users</h2>
        <ul className="mt-4 space-y-2">
          {rows.length === 0 && <li className="text-sm text-mkf-muted">No users yet.</li>}
          {rows.map((u) => (
            <li key={u._id}>
              <Card className="flex flex-col justify-between gap-2 p-4 sm:flex-row sm:items-center">
                <div>
                  <p className="font-medium text-mkf-ink">{u.name}</p>
                  <p className="text-sm text-mkf-muted">{u.email}</p>
                </div>
                <p className="text-xs font-medium uppercase tracking-wide text-mkf-teal">
                  {u.totpEnabled ? "MFA on" : "MFA off"}
                </p>
              </Card>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
