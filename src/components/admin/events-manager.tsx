"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type EventRow = {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  givebutterUrl: string;
  isActive: boolean;
  useForDonate: boolean;
};

const empty: Omit<EventRow, "_id"> = {
  title: "",
  slug: "",
  description: "",
  startDate: "",
  endDate: "",
  givebutterUrl: "",
  isActive: true,
  useForDonate: false,
};

export function EventsManager() {
  const [rows, setRows] = useState<EventRow[] | null>(null);
  const [form, setForm] = useState(empty);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const load = useCallback(() => {
    setErr(null);
    fetch("/api/admin/events")
      .then((r) => r.json())
      .then((d: EventRow[]) => setRows(Array.isArray(d) ? d : []))
      .catch(() => setErr("Failed to load events"));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function createEvent(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    setErr(null);
    const r = await fetch("/api/admin/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: form.title,
        slug: form.slug,
        description: form.description,
        startDate: form.startDate,
        endDate: form.endDate,
        givebutterUrl: form.givebutterUrl,
        isActive: form.isActive,
        useForDonate: form.useForDonate,
      }),
    });
    if (!r.ok) {
      setErr("Could not create event. Check fields (slug: lowercase, hyphens only).");
      return;
    }
    setForm(empty);
    setMsg("Event created.");
    load();
  }

  async function setDonate(_id: string) {
    setMsg(null);
    setErr(null);
    const r = await fetch("/api/admin/events", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id, useForDonate: true, isActive: true }),
    });
    if (!r.ok) {
      setErr("Could not set active Givebutter.");
      return;
    }
    setMsg("This event now powers the Donate page (Givebutter link).");
    load();
  }

  async function removeEvent(id: string) {
    if (!confirm("Delete this event?")) return;
    const r = await fetch(`/api/admin/events/${id}`, { method: "DELETE" });
    if (!r.ok) setErr("Delete failed");
    else load();
  }

  if (rows === null) {
    return <p className="text-mkf-muted">Loading…</p>;
  }

  return (
    <div className="space-y-10">
      <section>
        <h2 className="font-display text-xl font-semibold text-mkf-ink">Add event</h2>
        <Card className="mt-3 p-5 sm:p-6">
          <form className="grid gap-3 sm:grid-cols-2" onSubmit={createEvent}>
            <label className="sm:col-span-2">
              <span className="text-sm font-medium">Title</span>
              <input
                className="mt-1 w-full rounded-md border border-mkf-border bg-mkf-bg px-3 py-2 text-sm"
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                required
              />
            </label>
            <label>
              <span className="text-sm font-medium">URL slug (unique)</span>
              <input
                className="mt-1 w-full rounded-md border border-mkf-border bg-mkf-bg px-3 py-2 text-sm"
                value={form.slug}
                onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
                required
                placeholder="spring-2026-gala"
              />
            </label>
            <label>
              <span className="text-sm font-medium">Givebutter URL</span>
              <input
                className="mt-1 w-full rounded-md border border-mkf-border bg-mkf-bg px-3 py-2 text-sm"
                type="url"
                value={form.givebutterUrl}
                onChange={(e) => setForm((f) => ({ ...f, givebutterUrl: e.target.value }))}
                placeholder="https://givebutter.com/..."
              />
            </label>
            <label className="sm:col-span-2">
              <span className="text-sm font-medium">Description (optional)</span>
              <textarea
                className="mt-1 min-h-[4rem] w-full rounded-md border border-mkf-border bg-mkf-bg px-3 py-2 text-sm"
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              />
            </label>
            <label>
              <span className="text-sm font-medium">Start date (optional)</span>
              <input
                className="mt-1 w-full rounded-md border border-mkf-border bg-mkf-bg px-3 py-2 text-sm"
                value={form.startDate}
                onChange={(e) => setForm((f) => ({ ...f, startDate: e.target.value }))}
              />
            </label>
            <label>
              <span className="text-sm font-medium">End date (optional)</span>
              <input
                className="mt-1 w-full rounded-md border border-mkf-border bg-mkf-bg px-3 py-2 text-sm"
                value={form.endDate}
                onChange={(e) => setForm((f) => ({ ...f, endDate: e.target.value }))}
              />
            </label>
            <label className="flex items-center gap-2 sm:col-span-2">
              <input
                type="checkbox"
                checked={form.isActive}
                onChange={(e) => setForm((f) => ({ ...f, isActive: e.target.checked }))}
              />
              <span className="text-sm">Event is active (visible in listings)</span>
            </label>
            <label className="flex items-center gap-2 sm:col-span-2">
              <input
                type="checkbox"
                checked={form.useForDonate}
                onChange={(e) => setForm((f) => ({ ...f, useForDonate: e.target.checked }))}
              />
              <span className="text-sm">Use this Givebutter link on the Donate page (clears other choices)</span>
            </label>
            <div className="sm:col-span-2">
              <Button type="submit" variant="primary">
                Save event
              </Button>
            </div>
          </form>
        </Card>
        {msg && <p className="mt-2 text-sm text-mkf-teal">{msg}</p>}
        {err && <p className="mt-2 text-sm text-red-600">{err}</p>}
      </section>

      <section>
        <h2 className="font-display text-xl font-semibold text-mkf-ink">Existing events</h2>
        <ul className="mt-4 space-y-3">
          {rows.length === 0 && <li className="text-sm text-mkf-muted">No events yet.</li>}
          {rows.map((ev) => (
            <li key={ev._id}>
              <Card className="p-4">
                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                  <div>
                    <p className="font-display text-lg font-semibold text-mkf-ink">{ev.title}</p>
                    <p className="text-sm text-mkf-muted">/ {ev.slug}</p>
                    {ev.givebutterUrl ? (
                      <a
                        className="mt-1 block break-all text-sm text-mkf-primary hover:underline"
                        href={ev.givebutterUrl}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        {ev.givebutterUrl}
                      </a>
                    ) : (
                      <p className="mt-1 text-sm text-amber-800 dark:text-amber-200">No Givebutter URL</p>
                    )}
                    {ev.useForDonate && (
                      <p className="mt-1 text-xs font-medium uppercase tracking-wide text-mkf-teal">
                        Powers Donate page
                      </p>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {!ev.useForDonate && ev.givebutterUrl && (
                      <Button type="button" variant="secondary" onClick={() => void setDonate(ev._id)}>
                        Use for Donate
                      </Button>
                    )}
                    <Button type="button" variant="secondary" onClick={() => void removeEvent(ev._id)}>
                      Delete
                    </Button>
                  </div>
                </div>
              </Card>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
