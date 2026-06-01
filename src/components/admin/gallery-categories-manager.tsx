"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { CategoryRow, EventRow } from "@/lib/gallery-admin-shared";
import { slugifyName } from "@/lib/gallery-admin-shared";

export function GalleryCategoriesManager() {
  const router = useRouter();
  const [events, setEvents] = useState<EventRow[] | null>(null);
  const [categories, setCategories] = useState<CategoryRow[] | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);

  const [catName, setCatName] = useState("");
  const [catSlug, setCatSlug] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);
  const [catOrder, setCatOrder] = useState(0);
  const [catEventId, setCatEventId] = useState("");

  const reload = useCallback(() => {
    setErr(null);
    void Promise.all([
      fetch("/api/admin/events")
        .then((r) => r.json())
        .then((d: EventRow[]) => (Array.isArray(d) ? d : []))
        .catch(() => [] as EventRow[]),
      fetch("/api/admin/categories")
        .then((r) => r.json())
        .then((d: CategoryRow[]) => (Array.isArray(d) ? d : []))
        .catch(() => [] as CategoryRow[]),
    ]).then(([ev, cat]) => {
      setEvents(ev);
      setCategories(cat.sort((a, b) => a.order - b.order || a.name.localeCompare(b.name)));
    });
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  async function addCategory(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    setErr(null);
    const r = await fetch("/api/admin/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: catName,
        slug: catSlug,
        order: catOrder,
        eventId: catEventId ? catEventId : null,
      }),
    });
    if (!r.ok) {
      setErr("Could not create category (check slug: lowercase, hyphens only).");
      return;
    }
    const slug = catSlug || slugifyName(catName);
    setCatName("");
    setCatSlug("");
    setSlugTouched(false);
    setCatOrder(0);
    setCatEventId("");
    setMsg("Category saved.");
    reload();
    if (slug) {
      router.push(`/admin/gallery/${slug}`);
    }
  }

  async function deleteCategory(id: string, slug: string) {
    if (!confirm("Delete this category and all images in it?")) return;
    const r = await fetch(`/api/admin/categories/${id}`, { method: "DELETE" });
    if (!r.ok) setErr("Delete failed");
    else {
      setMsg(`Category “${slug}” removed.`);
      reload();
    }
  }

  if (events === null || categories === null) {
    return <p className="text-mkf-muted">Loading…</p>;
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-mkf-muted">
          Categories group photos on the public gallery. Each category has its own upload page.
        </p>
        <Button href="/admin/gallery" variant="secondary">
          Back to gallery
        </Button>
      </div>

      <Card className="p-5 sm:p-6">
        <h2 className="font-display text-lg font-semibold text-mkf-ink">New category</h2>
        <form className="mt-4 grid gap-3 sm:grid-cols-2" onSubmit={addCategory}>
          <label>
            <span className="text-sm font-medium">Name</span>
            <input
              className="mt-1 w-full rounded-md border border-mkf-border bg-mkf-bg px-3 py-2 text-sm"
              value={catName}
              onChange={(e) => {
                const name = e.target.value;
                setCatName(name);
                if (!slugTouched) setCatSlug(slugifyName(name));
              }}
              required
              placeholder="Community"
            />
          </label>
          <label>
            <span className="text-sm font-medium">Slug (URL)</span>
            <input
              className="mt-1 w-full rounded-md border border-mkf-border bg-mkf-bg px-3 py-2 text-sm"
              value={catSlug}
              onChange={(e) => {
                setSlugTouched(true);
                setCatSlug(e.target.value);
              }}
              required
              placeholder="community"
            />
            <span className="mt-1 block text-xs text-mkf-muted">Used in /admin/gallery/{catSlug || "…"}</span>
          </label>
          <label>
            <span className="text-sm font-medium">Display order</span>
            <input
              className="mt-1 w-full rounded-md border border-mkf-border bg-mkf-bg px-3 py-2 text-sm"
              type="number"
              value={catOrder}
              onChange={(e) => setCatOrder(Number(e.target.value))}
            />
          </label>
          <label>
            <span className="text-sm font-medium">Event (optional)</span>
            <select
              className="mt-1 w-full rounded-md border border-mkf-border bg-mkf-bg px-3 py-2 text-sm"
              value={catEventId}
              onChange={(e) => setCatEventId(e.target.value)}
            >
              <option value="">All / not tied to one event</option>
              {events.map((ev) => (
                <option key={ev._id} value={ev._id}>
                  {ev.title}
                </option>
              ))}
            </select>
          </label>
          <div className="sm:col-span-2">
            <Button type="submit" variant="primary">
              Create category & open upload page
            </Button>
          </div>
        </form>
      </Card>

      <section>
        <h2 className="font-display text-lg font-semibold text-mkf-ink">Existing categories</h2>
        <ul className="mt-4 space-y-2">
          {categories.length === 0 && (
            <li className="text-sm text-mkf-muted">No categories yet.</li>
          )}
          {categories.map((c) => (
            <li
              key={c._id}
              className="flex flex-col justify-between gap-2 rounded-lg border border-mkf-border bg-mkf-surface px-4 py-3 sm:flex-row sm:items-center"
            >
              <div>
                <Link href={`/admin/gallery/${c.slug}`} className="font-medium text-mkf-ink hover:underline">
                  {c.name}
                </Link>
                <span className="ml-2 text-sm text-mkf-muted">/ {c.slug}</span>
                {c.eventId && (
                  <span className="ml-2 text-xs text-mkf-teal">
                    (event: {events.find((e) => e._id === c.eventId)?.title ?? c.eventId})
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                <Button href={`/admin/gallery/${c.slug}`} variant="primary">
                  Upload photos
                </Button>
                <Button type="button" variant="secondary" onClick={() => void deleteCategory(c._id, c.slug)}>
                  Delete
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {msg && <p className="text-sm text-mkf-teal">{msg}</p>}
      {err && <p className="text-sm text-red-600">{err}</p>}
    </div>
  );
}
