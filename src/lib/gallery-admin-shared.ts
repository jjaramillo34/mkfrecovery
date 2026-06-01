export const IMAGEKIT_UPLOAD = "https://upload.imagekit.io/api/v1/files/upload";

export type CategoryRow = { _id: string; name: string; slug: string; order: number; eventId: string | null };
export type EventRow = { _id: string; title: string; slug: string };
export type GalleryItemRow = {
  _id: string;
  fileId: string;
  filePath: string;
  url: string;
  thumbnailUrl?: string;
  title: string;
  alt: string;
  categoryId: string;
  eventId: string | null;
  order: number;
};

export type AuthPayload = {
  publicKey: string;
  urlEndpoint: string;
  token: string;
  signature: string;
  expire: number;
};

export type IkUploadResponse = {
  fileId: string;
  name?: string;
  filePath?: string;
  url: string;
  height?: number;
  width?: number;
  thumbnailUrl?: string;
};

export function parseIkResponse(data: unknown, httpOk: boolean): IkUploadResponse {
  if (typeof data !== "object" || !data) {
    throw new Error("Invalid upload response");
  }
  const o = data as Record<string, unknown>;
  if (!httpOk) {
    const m = o.message;
    let msg: string;
    if (Array.isArray(m) && m[0] && typeof m[0] === "object" && m[0] !== null && "message" in m[0]) {
      msg = String((m[0] as { message?: string }).message ?? "Upload failed");
    } else {
      msg = typeof o.message === "string" ? o.message : "Upload failed";
    }
    throw new Error(msg);
  }
  const fileId = o.fileId != null ? String(o.fileId) : "";
  const url = o.url != null ? String(o.url) : "";
  if (!fileId || !url) {
    throw new Error("ImageKit did not return fileId/url");
  }
  return o as unknown as IkUploadResponse;
}

export function humanizeFilename(name: string): string {
  const base = name.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ").trim();
  if (!base) return "Gallery image";
  return base.charAt(0).toUpperCase() + base.slice(1);
}

export function slugifyName(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function buildGalleryMeta(
  categoryName: string,
  opts?: {
    file?: File;
    batchIndex?: number;
    batchTotal?: number;
    eventTitle?: string;
  },
): { title: string; alt: string } {
  const cat = categoryName.trim() || "Gallery";
  const eventBit = opts?.eventTitle ? ` (${opts.eventTitle})` : "";

  if (opts?.batchTotal && opts.batchTotal > 1 && opts.batchIndex !== undefined) {
    const n = opts.batchIndex + 1;
    return {
      title: `${cat} ${n}`,
      alt: `${cat} gallery photo ${n}${eventBit}`,
    };
  }

  if (opts?.file) {
    const detail = humanizeFilename(opts.file.name);
    return {
      title: `${cat} — ${detail}`,
      alt: `${cat} gallery photo${eventBit}: ${detail}`,
    };
  }

  return {
    title: cat,
    alt: `${cat} gallery photo${eventBit}`,
  };
}

export function isImageFile(file: File): boolean {
  return file.type.startsWith("image/");
}

export function reorderList<T>(list: T[], fromIndex: number, toIndex: number): T[] {
  const next = [...list];
  const [removed] = next.splice(fromIndex, 1);
  if (removed === undefined) return list;
  next.splice(toIndex, 0, removed);
  return next;
}

export function sortGalleryItems(list: GalleryItemRow[]): GalleryItemRow[] {
  return [...list].sort((a, b) => a.order - b.order || a._id.localeCompare(b._id));
}

export async function fetchImageKitAuth(): Promise<AuthPayload> {
  const authR = await fetch("/api/admin/imagekit/auth");
  if (!authR.ok) {
    const j = await authR.json().catch(() => ({}));
    const msg =
      typeof (j as { error?: string }).error === "string"
        ? (j as { error: string }).error
        : "ImageKit not available";
    throw new Error(msg);
  }
  return (await authR.json()) as AuthPayload;
}
