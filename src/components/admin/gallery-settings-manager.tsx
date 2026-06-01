"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DEFAULT_GALLERY_SETTINGS,
  type GalleryAspectRatio,
  type GalleryLayout,
  type PublicGallerySettings,
} from "@/lib/gallery-settings-types";

const DEFAULT_INTRO =
  "Browse photos from programs and events. Tap a filter to explore a campaign or category.";

export function GallerySettingsManager() {
  const [settings, setSettings] = useState<PublicGallerySettings | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const reload = useCallback(() => {
    setErr(null);
    fetch("/api/admin/gallery/settings")
      .then((r) => r.json())
      .then((d: PublicGallerySettings) => setSettings({ ...DEFAULT_GALLERY_SETTINGS, ...d }))
      .catch(() => setErr("Could not load settings."));
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (!settings) return;
    setSaving(true);
    setErr(null);
    setMsg(null);
    const r = await fetch("/api/admin/gallery/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });
    setSaving(false);
    if (!r.ok) {
      setErr("Could not save settings.");
      return;
    }
    const next = (await r.json()) as PublicGallerySettings;
    setSettings(next);
    setMsg("Gallery settings saved.");
  }

  if (!settings) {
    return <p className="text-mkf-muted">{err ?? "Loading…"}</p>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-mkf-muted">
          Defaults for the public gallery at{" "}
          <Link href="/gallery" target="_blank" className="text-mkf-accent hover:underline">
            /gallery
          </Link>
          .
        </p>
        <Button href="/admin/gallery" variant="secondary">
          Back to gallery
        </Button>
      </div>

      <Card className="p-5 sm:p-6">
        <form className="space-y-6" onSubmit={save}>
          <fieldset className="space-y-4">
            <legend className="font-display text-lg font-semibold text-mkf-ink">Display</legend>
            <div className="grid gap-4 sm:grid-cols-2">
              <label>
                <span className="text-sm font-medium">Max photos shown</span>
                <input
                  className="mt-1 w-full rounded-md border border-mkf-border bg-mkf-bg px-3 py-2 text-sm"
                  type="number"
                  min={1}
                  max={200}
                  value={settings.maxImages}
                  onChange={(e) =>
                    setSettings((s) => s && { ...s, maxImages: Number(e.target.value) })
                  }
                />
                <span className="mt-1 block text-xs text-mkf-muted">
                  Default 50. Oldest-by-order photos load first; increase only if needed.
                </span>
              </label>
              <label>
                <span className="text-sm font-medium">Grid layout</span>
                <select
                  className="mt-1 w-full rounded-md border border-mkf-border bg-mkf-bg px-3 py-2 text-sm"
                  value={settings.layout}
                  onChange={(e) =>
                    setSettings((s) => s && { ...s, layout: e.target.value as GalleryLayout })
                  }
                >
                  <option value="compact">Compact (up to 5 columns)</option>
                  <option value="standard">Standard (4 columns)</option>
                  <option value="wide">Wide (3 columns, larger tiles)</option>
                </select>
              </label>
              <label>
                <span className="text-sm font-medium">Thumbnail shape</span>
                <select
                  className="mt-1 w-full rounded-md border border-mkf-border bg-mkf-bg px-3 py-2 text-sm"
                  value={settings.aspectRatio}
                  onChange={(e) =>
                    setSettings((s) => s && { ...s, aspectRatio: e.target.value as GalleryAspectRatio })
                  }
                >
                  <option value="4/3">4:3 landscape</option>
                  <option value="1/1">Square</option>
                  <option value="16/9">16:9 widescreen</option>
                </select>
              </label>
            </div>
          </fieldset>

          <fieldset className="space-y-3">
            <legend className="font-display text-lg font-semibold text-mkf-ink">Filters</legend>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={settings.showEventFilters}
                onChange={(e) =>
                  setSettings((s) => s && { ...s, showEventFilters: e.target.checked })
                }
              />
              Show event filter pills
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={settings.showCategoryFilters}
                onChange={(e) =>
                  setSettings((s) => s && { ...s, showCategoryFilters: e.target.checked })
                }
              />
              Show category filter pills
            </label>
          </fieldset>

          <fieldset className="space-y-2">
            <legend className="font-display text-lg font-semibold text-mkf-ink">Intro text</legend>
            <label>
              <span className="text-sm font-medium">Gallery page intro</span>
              <textarea
                className="mt-1 w-full rounded-md border border-mkf-border bg-mkf-bg px-3 py-2 text-sm"
                rows={3}
                maxLength={500}
                placeholder={DEFAULT_INTRO}
                value={settings.intro}
                onChange={(e) => setSettings((s) => s && { ...s, intro: e.target.value })}
              />
              <span className="mt-1 block text-xs text-mkf-muted">
                Leave blank to use the default intro.
              </span>
            </label>
          </fieldset>

          <Button type="submit" variant="primary" disabled={saving}>
            {saving ? "Saving…" : "Save settings"}
          </Button>
        </form>
      </Card>

      {msg && <p className="text-sm text-mkf-teal">{msg}</p>}
      {err && <p className="text-sm text-red-600">{err}</p>}
    </div>
  );
}
