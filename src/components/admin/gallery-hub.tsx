"use client";

import { SmartLink, Text } from "@once-ui-system/core";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { CategoryRow, GalleryItemRow } from "@/lib/gallery-admin-shared";

type CategoryWithCount = CategoryRow & { imageCount: number };

export function GalleryHub() {
  const [categories, setCategories] = useState<CategoryWithCount[] | null>(null);

  const reload = useCallback(() => {
    void Promise.all([
      fetch("/api/admin/categories")
        .then((r) => r.json())
        .then((d: CategoryRow[]) => (Array.isArray(d) ? d : []))
        .catch(() => [] as CategoryRow[]),
      fetch("/api/admin/gallery")
        .then((r) => r.json())
        .then((d: GalleryItemRow[]) => (Array.isArray(d) ? d : []))
        .catch(() => [] as GalleryItemRow[]),
    ]).then(([cats, items]) => {
      const counts = new Map<string, number>();
      for (const item of items) {
        counts.set(item.categoryId, (counts.get(item.categoryId) ?? 0) + 1);
      }
      setCategories(
        cats
          .map((c) => ({ ...c, imageCount: counts.get(c._id) ?? 0 }))
          .sort((a, b) => a.order - b.order || a.name.localeCompare(b.name)),
      );
    });
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  if (categories === null) {
    return <p className="text-mkf-muted">Loading…</p>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-mkf-muted">
          Choose a category to upload photos and set display order.
        </p>
        <Button href="/admin/gallery/settings" variant="secondary">
          Gallery settings
        </Button>
        <Button href="/admin/gallery/categories" variant="secondary">
          Manage categories
        </Button>
      </div>

      {categories.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-mkf-ink">No gallery categories yet.</p>
          <p className="mt-2 text-sm text-mkf-muted">
            Create categories first, then return here to upload images into each one.
          </p>
          <Button href="/admin/gallery/categories" variant="primary" className="mt-4">
            Create a category
          </Button>
        </Card>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <li key={c._id}>
              <Link href={`/admin/gallery/${c.slug}`} className="block h-full">
                <Card className="flex h-full flex-col gap-3 p-5 transition-shadow hover:shadow-md">
                  <div>
                    <p className="font-display text-lg font-semibold text-mkf-ink">{c.name}</p>
                    <p className="text-sm text-mkf-muted">/{c.slug}</p>
                  </div>
                  <p className="text-sm text-mkf-muted">
                    {c.imageCount === 0
                      ? "No photos yet"
                      : `${c.imageCount} photo${c.imageCount === 1 ? "" : "s"}`}
                  </p>
                  <Text as="span" variant="label-strong-s" onBackground="brand-medium">
                    Manage photos →
                  </Text>
                </Card>
              </Link>
            </li>
          ))}
        </ul>
      )}

      <p className="text-sm text-mkf-muted">
        View the{" "}
        <SmartLink href="/gallery" target="_blank">
          <Text as="span" variant="label-strong-s" onBackground="brand-medium">
            public gallery
          </Text>
        </SmartLink>
        .
      </p>
    </div>
  );
}
