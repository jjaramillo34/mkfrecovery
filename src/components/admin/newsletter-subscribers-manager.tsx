"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type SubscriberRow = {
  _id: string;
  email: string;
  subscribed: boolean;
  createdAt: string;
  updatedAt: string;
};

type SubscriberStats = {
  total: number;
  active: number;
  unsubscribed: number;
};

type Filter = "all" | "active" | "unsubscribed";

function formatDate(iso: string) {
  try {
    return new Intl.DateTimeFormat(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export function NewsletterSubscribersManager() {
  const [rows, setRows] = useState<SubscriberRow[] | null>(null);
  const [stats, setStats] = useState<SubscriberStats | null>(null);
  const [filter, setFilter] = useState<Filter>("all");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const load = useCallback(() => {
    setErr(null);
    fetch("/api/admin/newsletter/subscribers")
      .then((r) => r.json())
      .then((d: { subscribers?: SubscriberRow[]; stats?: SubscriberStats }) => {
        setRows(Array.isArray(d.subscribers) ? d.subscribers : []);
        setStats(d.stats ?? null);
      })
      .catch(() => setErr("Failed to load subscribers"));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const filtered = useMemo(() => {
    if (!rows) return [];
    if (filter === "active") return rows.filter((r) => r.subscribed);
    if (filter === "unsubscribed") return rows.filter((r) => !r.subscribed);
    return rows;
  }, [rows, filter]);

  async function addSubscriber(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    setErr(null);
    const r = await fetch("/api/admin/newsletter/subscribers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    if (!r.ok) {
      setErr("Could not add subscriber. Check the email address.");
      return;
    }
    setEmail("");
    setMsg("Subscriber added.");
    load();
  }

  async function setSubscribed(_id: string, subscribed: boolean) {
    setMsg(null);
    setErr(null);
    const r = await fetch("/api/admin/newsletter/subscribers", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id, subscribed }),
    });
    if (!r.ok) {
      setErr("Could not update subscriber.");
      return;
    }
    load();
  }

  async function removeSubscriber(id: string) {
    if (!confirm("Remove this subscriber from the list?")) return;
    const r = await fetch(`/api/admin/newsletter/subscribers/${id}`, { method: "DELETE" });
    if (!r.ok) setErr("Delete failed");
    else load();
  }

  function exportCsv() {
    if (!rows?.length) return;
    const header = "email,subscribed,created_at,updated_at\n";
    const body = rows
      .map((r) =>
        [r.email, r.subscribed ? "yes" : "no", r.createdAt, r.updatedAt]
          .map((v) => `"${String(v).replace(/"/g, '""')}"`)
          .join(","),
      )
      .join("\n");
    const blob = new Blob([header + body], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `mkf-newsletter-subscribers-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  if (rows === null) {
    return <p className="text-mkf-muted">Loading…</p>;
  }

  return (
    <div className="space-y-10">
      {stats && (
        <div className="grid gap-3 sm:grid-cols-3">
          <Card className="p-4">
            <p className="text-sm text-mkf-muted">Total</p>
            <p className="font-display text-2xl font-semibold text-mkf-ink">{stats.total}</p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-mkf-muted">Active</p>
            <p className="font-display text-2xl font-semibold text-mkf-teal">{stats.active}</p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-mkf-muted">Unsubscribed</p>
            <p className="font-display text-2xl font-semibold text-mkf-muted">{stats.unsubscribed}</p>
          </Card>
        </div>
      )}

      <section>
        <h2 className="font-display text-xl font-semibold text-mkf-ink">Add subscriber</h2>
        <p className="mt-1 text-sm text-mkf-muted">
          Manually add an email collected offline. This does not send a welcome email.
        </p>
        <Card className="mt-3 p-5 sm:p-6">
          <form className="flex flex-col gap-3 sm:flex-row sm:items-end" onSubmit={addSubscriber}>
            <label className="min-w-0 flex-1">
              <span className="text-sm font-medium">Email</span>
              <input
                className="mt-1 w-full rounded-md border border-mkf-border bg-mkf-bg px-3 py-2 text-sm"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.org"
              />
            </label>
            <Button type="submit" variant="primary" className="shrink-0">
              Add
            </Button>
          </form>
        </Card>
      </section>

      <section>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="font-display text-xl font-semibold text-mkf-ink">Subscribers</h2>
          <div className="flex flex-wrap items-center gap-2">
            {(["all", "active", "unsubscribed"] as const).map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setFilter(key)}
                className={`rounded-full px-3 py-1 text-xs font-medium uppercase tracking-wide transition-colors ${
                  filter === key
                    ? "bg-mkf-teal/15 text-mkf-teal"
                    : "bg-mkf-border/40 text-mkf-muted hover:text-mkf-ink"
                }`}
              >
                {key}
              </button>
            ))}
            {rows.length > 0 && (
              <Button type="button" variant="secondary" onClick={exportCsv}>
                Export CSV
              </Button>
            )}
          </div>
        </div>

        <ul className="mt-4 space-y-3">
          {filtered.length === 0 && (
            <li className="text-sm text-mkf-muted">
              {rows.length === 0
                ? "No subscribers yet. They will appear here when someone signs up on the homepage."
                : "No subscribers match this filter."}
            </li>
          )}
          {filtered.map((row) => (
            <li key={row._id}>
              <Card className="p-4">
                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="truncate font-medium text-mkf-ink">{row.email}</p>
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-medium uppercase tracking-wide ${
                          row.subscribed
                            ? "bg-mkf-teal/15 text-mkf-teal"
                            : "bg-mkf-border/60 text-mkf-muted"
                        }`}
                      >
                        {row.subscribed ? "Active" : "Unsubscribed"}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-mkf-muted">
                      Joined {formatDate(row.createdAt)}
                      {row.updatedAt !== row.createdAt && <> · Updated {formatDate(row.updatedAt)}</>}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {row.subscribed ? (
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={() => void setSubscribed(row._id, false)}
                      >
                        Unsubscribe
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={() => void setSubscribed(row._id, true)}
                      >
                        Re-subscribe
                      </Button>
                    )}
                    <Button type="button" variant="secondary" onClick={() => void removeSubscriber(row._id)}>
                      Remove
                    </Button>
                  </div>
                </div>
              </Card>
            </li>
          ))}
        </ul>
      </section>

      {msg && <p className="text-sm text-mkf-teal">{msg}</p>}
      {err && <p className="text-sm text-red-600">{err}</p>}
    </div>
  );
}
