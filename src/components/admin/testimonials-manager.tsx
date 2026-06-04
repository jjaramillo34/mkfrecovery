"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { slugifyName } from "@/lib/gallery-admin-shared";
import type { AdminTestimonialRow } from "@/lib/recovery-testimonial-types";

type FormState = {
  slug: string;
  heading: string;
  paragraphs: string[];
  name: string;
  location: string;
  published: boolean;
  order: number;
};

const emptyForm = (): FormState => ({
  slug: "",
  heading: "",
  paragraphs: [""],
  name: "",
  location: "",
  published: false,
  order: 0,
});

function formFromRow(row: AdminTestimonialRow): FormState {
  return {
    slug: row.slug,
    heading: row.heading,
    paragraphs: row.paragraphs.length > 0 ? [...row.paragraphs] : [""],
    name: row.name,
    location: row.location,
    published: row.published,
    order: row.order,
  };
}

export function TestimonialsManager() {
  const [rows, setRows] = useState<AdminTestimonialRow[] | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [slugTouched, setSlugTouched] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<FormState>(emptyForm());
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const load = useCallback(() => {
    setErr(null);
    fetch("/api/admin/testimonials")
      .then((r) => r.json())
      .then((d: AdminTestimonialRow[]) => setRows(Array.isArray(d) ? d : []))
      .catch(() => setErr("Failed to load testimonials"));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  function updateParagraphs(
    setter: React.Dispatch<React.SetStateAction<FormState>>,
    index: number,
    value: string,
  ) {
    setter((f) => {
      const next = [...f.paragraphs];
      next[index] = value;
      return { ...f, paragraphs: next };
    });
  }

  function addParagraph(setter: React.Dispatch<React.SetStateAction<FormState>>) {
    setter((f) => ({ ...f, paragraphs: [...f.paragraphs, ""] }));
  }

  function removeParagraph(
    setter: React.Dispatch<React.SetStateAction<FormState>>,
    index: number,
  ) {
    setter((f) => {
      if (f.paragraphs.length <= 1) return f;
      return { ...f, paragraphs: f.paragraphs.filter((_, i) => i !== index) };
    });
  }

  async function createTestimonial(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    setErr(null);
    const paragraphs = form.paragraphs.map((p) => p.trim()).filter(Boolean);
    if (paragraphs.length === 0) {
      setErr("Add at least one paragraph.");
      return;
    }
    const r = await fetch("/api/admin/testimonials", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, paragraphs }),
    });
    if (!r.ok) {
      setErr("Could not create testimonial. Check fields (slug: lowercase, hyphens only).");
      return;
    }
    setForm(emptyForm());
    setSlugTouched(false);
    setMsg("Testimonial saved.");
    load();
  }

  async function saveEdit(e: React.FormEvent) {
    e.preventDefault();
    if (!editingId) return;
    setMsg(null);
    setErr(null);
    const paragraphs = editForm.paragraphs.map((p) => p.trim()).filter(Boolean);
    if (paragraphs.length === 0) {
      setErr("Add at least one paragraph.");
      return;
    }
    const r = await fetch("/api/admin/testimonials", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id: editingId, ...editForm, paragraphs }),
    });
    if (!r.ok) {
      setErr("Could not update testimonial.");
      return;
    }
    setEditingId(null);
    setEditForm(emptyForm());
    setMsg("Testimonial updated.");
    load();
  }

  async function togglePublished(row: AdminTestimonialRow) {
    setMsg(null);
    setErr(null);
    const r = await fetch("/api/admin/testimonials", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id: row._id, published: !row.published }),
    });
    if (!r.ok) {
      setErr("Could not update publish status.");
      return;
    }
    load();
  }

  async function removeTestimonial(id: string) {
    if (!confirm("Delete this testimonial?")) return;
    const r = await fetch(`/api/admin/testimonials/${id}`, { method: "DELETE" });
    if (!r.ok) setErr("Delete failed");
    else load();
  }

  async function moveTestimonial(index: number, direction: -1 | 1) {
    if (!rows) return;
    const target = index + direction;
    if (target < 0 || target >= rows.length) return;
    const reordered = [...rows];
    const a = reordered[index]!;
    const b = reordered[target]!;
    reordered[index] = b;
    reordered[target] = a;
    const items = reordered.map((row, i) => ({ _id: row._id, order: i }));
    const r = await fetch("/api/admin/testimonials/reorder", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items }),
    });
    if (!r.ok) {
      setErr("Could not reorder.");
      return;
    }
    load();
  }

  function renderParagraphFields(
    paragraphs: string[],
    onChange: (index: number, value: string) => void,
    onAdd: () => void,
    onRemove: (index: number) => void,
    idPrefix: string,
  ) {
    return (
      <div className="space-y-3 sm:col-span-2">
        <span className="text-sm font-medium">Story paragraphs</span>
        {paragraphs.map((paragraph, i) => (
          <div key={`${idPrefix}-p-${i}`} className="flex gap-2">
            <textarea
              className="min-h-[5rem] flex-1 rounded-md border border-mkf-border bg-mkf-bg px-3 py-2 text-sm"
              value={paragraph}
              onChange={(e) => onChange(i, e.target.value)}
              placeholder={`Paragraph ${i + 1}`}
              required={i === 0}
            />
            {paragraphs.length > 1 && (
              <Button
                type="button"
                variant="secondary"
                className="shrink-0 self-start"
                onClick={() => onRemove(i)}
              >
                Remove
              </Button>
            )}
          </div>
        ))}
        {paragraphs.length < 10 && (
          <Button type="button" variant="secondary" onClick={onAdd}>
            Add paragraph
          </Button>
        )}
      </div>
    );
  }

  if (rows === null) {
    return <p className="text-mkf-muted">Loading…</p>;
  }

  return (
    <div className="space-y-10">
      <section>
        <h2 className="font-display text-xl font-semibold text-mkf-ink">Add recovery story</h2>
        <p className="mt-1 text-sm text-mkf-muted">
          Published stories appear in the memorial carousel on the homepage, mission, and donate pages.
        </p>
        <Card className="mt-3 p-5 sm:p-6">
          <form className="grid gap-3 sm:grid-cols-2" onSubmit={createTestimonial}>
            <label className="sm:col-span-2">
              <span className="text-sm font-medium">Heading</span>
              <input
                className="mt-1 w-full rounded-md border border-mkf-border bg-mkf-bg px-3 py-2 text-sm"
                value={form.heading}
                onChange={(e) => setForm((f) => ({ ...f, heading: e.target.value }))}
                required
                placeholder="A voice from recovery"
              />
            </label>
            <label>
              <span className="text-sm font-medium">Name</span>
              <input
                className="mt-1 w-full rounded-md border border-mkf-border bg-mkf-bg px-3 py-2 text-sm"
                value={form.name}
                onChange={(e) => {
                  const name = e.target.value;
                  setForm((f) => ({
                    ...f,
                    name,
                    slug: slugTouched ? f.slug : slugifyName(name),
                  }));
                }}
                required
              />
            </label>
            <label>
              <span className="text-sm font-medium">Location</span>
              <input
                className="mt-1 w-full rounded-md border border-mkf-border bg-mkf-bg px-3 py-2 text-sm"
                value={form.location}
                onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
                required
                placeholder="Queens, NY"
              />
            </label>
            <label>
              <span className="text-sm font-medium">URL slug (unique)</span>
              <input
                className="mt-1 w-full rounded-md border border-mkf-border bg-mkf-bg px-3 py-2 text-sm"
                value={form.slug}
                onChange={(e) => {
                  setSlugTouched(true);
                  setForm((f) => ({ ...f, slug: e.target.value }));
                }}
                required
                placeholder="annie-g"
              />
            </label>
            <label>
              <span className="text-sm font-medium">Display order</span>
              <input
                className="mt-1 w-full rounded-md border border-mkf-border bg-mkf-bg px-3 py-2 text-sm"
                type="number"
                min={0}
                value={form.order}
                onChange={(e) => setForm((f) => ({ ...f, order: Number(e.target.value) || 0 }))}
              />
            </label>
            {renderParagraphFields(
              form.paragraphs,
              (index, value) => updateParagraphs(setForm, index, value),
              () => addParagraph(setForm),
              (index) => removeParagraph(setForm, index),
              "create",
            )}
            <label className="flex items-center gap-2 sm:col-span-2">
              <input
                type="checkbox"
                checked={form.published}
                onChange={(e) => setForm((f) => ({ ...f, published: e.target.checked }))}
              />
              <span className="text-sm">Publish on the public site</span>
            </label>
            <div className="sm:col-span-2">
              <Button type="submit" variant="primary">
                Save testimonial
              </Button>
            </div>
          </form>
        </Card>
        {msg && <p className="mt-2 text-sm text-mkf-teal">{msg}</p>}
        {err && <p className="mt-2 text-sm text-red-600">{err}</p>}
      </section>

      <section>
        <h2 className="font-display text-xl font-semibold text-mkf-ink">Existing stories</h2>
        <ul className="mt-4 space-y-3">
          {rows.length === 0 && (
            <li className="text-sm text-mkf-muted">
              No testimonials in the database yet. Add one above, or the site will show built-in sample
              stories until you publish your own.
            </li>
          )}
          {rows.map((row, index) => (
            <li key={row._id}>
              <Card className="p-4">
                {editingId === row._id ? (
                  <form className="grid gap-3 sm:grid-cols-2" onSubmit={saveEdit}>
                    <label className="sm:col-span-2">
                      <span className="text-sm font-medium">Heading</span>
                      <input
                        className="mt-1 w-full rounded-md border border-mkf-border bg-mkf-bg px-3 py-2 text-sm"
                        value={editForm.heading}
                        onChange={(e) => setEditForm((f) => ({ ...f, heading: e.target.value }))}
                        required
                      />
                    </label>
                    <label>
                      <span className="text-sm font-medium">Name</span>
                      <input
                        className="mt-1 w-full rounded-md border border-mkf-border bg-mkf-bg px-3 py-2 text-sm"
                        value={editForm.name}
                        onChange={(e) => setEditForm((f) => ({ ...f, name: e.target.value }))}
                        required
                      />
                    </label>
                    <label>
                      <span className="text-sm font-medium">Location</span>
                      <input
                        className="mt-1 w-full rounded-md border border-mkf-border bg-mkf-bg px-3 py-2 text-sm"
                        value={editForm.location}
                        onChange={(e) => setEditForm((f) => ({ ...f, location: e.target.value }))}
                        required
                      />
                    </label>
                    <label>
                      <span className="text-sm font-medium">URL slug</span>
                      <input
                        className="mt-1 w-full rounded-md border border-mkf-border bg-mkf-bg px-3 py-2 text-sm"
                        value={editForm.slug}
                        onChange={(e) => setEditForm((f) => ({ ...f, slug: e.target.value }))}
                        required
                      />
                    </label>
                    <label>
                      <span className="text-sm font-medium">Display order</span>
                      <input
                        className="mt-1 w-full rounded-md border border-mkf-border bg-mkf-bg px-3 py-2 text-sm"
                        type="number"
                        min={0}
                        value={editForm.order}
                        onChange={(e) =>
                          setEditForm((f) => ({ ...f, order: Number(e.target.value) || 0 }))
                        }
                      />
                    </label>
                    {renderParagraphFields(
                      editForm.paragraphs,
                      (index, value) => updateParagraphs(setEditForm, index, value),
                      () => addParagraph(setEditForm),
                      (index) => removeParagraph(setEditForm, index),
                      `edit-${row._id}`,
                    )}
                    <label className="flex items-center gap-2 sm:col-span-2">
                      <input
                        type="checkbox"
                        checked={editForm.published}
                        onChange={(e) => setEditForm((f) => ({ ...f, published: e.target.checked }))}
                      />
                      <span className="text-sm">Published</span>
                    </label>
                    <div className="flex flex-wrap gap-2 sm:col-span-2">
                      <Button type="submit" variant="primary">
                        Save changes
                      </Button>
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={() => {
                          setEditingId(null);
                          setEditForm(emptyForm());
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                ) : (
                  <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-display text-lg font-semibold text-mkf-ink">{row.heading}</p>
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs font-medium uppercase tracking-wide ${
                            row.published
                              ? "bg-mkf-teal/15 text-mkf-teal"
                              : "bg-mkf-border/60 text-mkf-muted"
                          }`}
                        >
                          {row.published ? "Published" : "Draft"}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-mkf-muted">
                        {row.name} · {row.location}
                      </p>
                      <p className="mt-2 line-clamp-2 text-sm text-mkf-muted">{row.paragraphs[0]}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Button
                        type="button"
                        variant="secondary"
                        disabled={index === 0}
                        onClick={() => void moveTestimonial(index, -1)}
                      >
                        Move up
                      </Button>
                      <Button
                        type="button"
                        variant="secondary"
                        disabled={index === rows.length - 1}
                        onClick={() => void moveTestimonial(index, 1)}
                      >
                        Move down
                      </Button>
                      <Button type="button" variant="secondary" onClick={() => void togglePublished(row)}>
                        {row.published ? "Unpublish" : "Publish"}
                      </Button>
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={() => {
                          setEditingId(row._id);
                          setEditForm(formFromRow(row));
                          setMsg(null);
                          setErr(null);
                        }}
                      >
                        Edit
                      </Button>
                      <Button type="button" variant="secondary" onClick={() => void removeTestimonial(row._id)}>
                        Delete
                      </Button>
                    </div>
                  </div>
                )}
              </Card>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
