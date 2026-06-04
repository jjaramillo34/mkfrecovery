"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type FormSubmissionRow = {
  _id: string;
  type: "contact" | "volunteer";
  email: string;
  name: string;
  payload: Record<string, string>;
  emailSent: boolean;
  createdAt: string;
};

type FormsSettings = {
  from: string;
  notifyEmail: string;
  configured: boolean;
};

type Filter = "all" | "contact" | "volunteer";

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

function submissionDetails(row: FormSubmissionRow) {
  if (row.type === "contact") {
    return [
      { label: "Role", value: row.payload.roleLabel ?? row.payload.role ?? "—" },
      { label: "Message", value: row.payload.message ?? "—" },
    ];
  }
  return [
    { label: "Interests & skills", value: row.payload.interests ?? "—" },
    { label: "Availability", value: row.payload.availability?.trim() || "Not specified" },
  ];
}

export function FormsSubmissionsManager() {
  const [rows, setRows] = useState<FormSubmissionRow[] | null>(null);
  const [settings, setSettings] = useState<FormsSettings | null>(null);
  const [filter, setFilter] = useState<Filter>("all");
  const [err, setErr] = useState<string | null>(null);

  const load = useCallback(() => {
    setErr(null);
    const query = filter === "all" ? "" : `?type=${filter}`;
    fetch(`/api/admin/forms/submissions${query}`)
      .then((r) => r.json())
      .then(
        (d: {
          submissions?: FormSubmissionRow[];
          settings?: FormsSettings;
        }) => {
          setRows(Array.isArray(d.submissions) ? d.submissions : []);
          setSettings(d.settings ?? null);
        },
      )
      .catch(() => setErr("Failed to load form submissions"));
  }, [filter]);

  useEffect(() => {
    load();
  }, [load]);

  const counts = useMemo(() => {
    if (!rows) return { contact: 0, volunteer: 0 };
    return {
      contact: rows.filter((r) => r.type === "contact").length,
      volunteer: rows.filter((r) => r.type === "volunteer").length,
    };
  }, [rows]);

  async function removeSubmission(id: string) {
    if (!confirm("Delete this submission?")) return;
    const r = await fetch(`/api/admin/forms/submissions/${id}`, { method: "DELETE" });
    if (!r.ok) setErr("Delete failed");
    else load();
  }

  if (rows === null) {
    return <p className="text-mkf-muted">Loading…</p>;
  }

  return (
    <div className="space-y-10">
      {settings && (
        <Card className="p-5 sm:p-6">
          <h2 className="font-display text-lg font-semibold text-mkf-ink">Form email settings</h2>
          <p className="mt-2 text-sm text-mkf-muted">
            Contact and volunteer forms send through Resend using these addresses. Override with{" "}
            <code className="text-xs">RESEND_FORMS_FROM_EMAIL</code> and{" "}
            <code className="text-xs">RESEND_FORMS_TO_EMAIL</code> in your environment.
          </p>
          <dl className="mt-4 space-y-3 text-sm">
            <div>
              <dt className="font-medium text-mkf-fg">Send from</dt>
              <dd className="mt-0.5 break-all text-mkf-muted">{settings.from}</dd>
            </div>
            <div>
              <dt className="font-medium text-mkf-fg">Deliver to inbox</dt>
              <dd className="mt-0.5 break-all text-mkf-muted">{settings.notifyEmail}</dd>
            </div>
            <div>
              <dt className="font-medium text-mkf-fg">Resend status</dt>
              <dd className="mt-0.5">
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-medium uppercase tracking-wide ${
                    settings.configured
                      ? "bg-mkf-teal/15 text-mkf-teal"
                      : "bg-amber-100 text-amber-900 dark:bg-amber-950/40 dark:text-amber-200"
                  }`}
                >
                  {settings.configured ? "Configured" : "Missing RESEND_API_KEY"}
                </span>
              </dd>
            </div>
          </dl>
          <p className="mt-4 text-sm text-mkf-muted">
            In Resend, the sending domain must be verified. This project uses{" "}
            <strong className="text-mkf-fg">newsletter.mkfrecovery.org</strong> — set{" "}
            <code className="text-xs">RESEND_FORMS_FROM_EMAIL</code> to an address on that domain (e.g.{" "}
            <strong className="text-mkf-fg">contact@newsletter.mkfrecovery.org</strong>). Delivery inbox can
            still be <strong className="text-mkf-fg">contact@mkfrecovery.org</strong>.
          </p>
        </Card>
      )}

      <section>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="font-display text-xl font-semibold text-mkf-ink">Submissions</h2>
          <div className="flex flex-wrap gap-2">
            {(["all", "contact", "volunteer"] as const).map((key) => (
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
                {key === "contact" && filter === "all" ? ` (${counts.contact})` : ""}
                {key === "volunteer" && filter === "all" ? ` (${counts.volunteer})` : ""}
              </button>
            ))}
          </div>
        </div>

        <ul className="mt-4 space-y-3">
          {rows.length === 0 && (
            <li className="text-sm text-mkf-muted">
              No submissions yet. Messages from the Contact and Get Involved volunteer forms will appear
              here.
            </li>
          )}
          {rows.map((row) => (
            <li key={row._id}>
              <Card className="p-4">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-display font-semibold text-mkf-ink">{row.name}</p>
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-medium uppercase tracking-wide ${
                          row.type === "contact"
                            ? "bg-mkf-primary/10 text-mkf-primary"
                            : "bg-mkf-gold/15 text-mkf-gold"
                        }`}
                      >
                        {row.type}
                      </span>
                      {!row.emailSent && (
                        <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium uppercase tracking-wide text-amber-900 dark:bg-amber-950/40 dark:text-amber-200">
                          Email not sent
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-mkf-muted">
                      <a className="text-mkf-teal hover:underline" href={`mailto:${row.email}`}>
                        {row.email}
                      </a>
                      {" · "}
                      {formatDate(row.createdAt)}
                    </p>
                    <dl className="mt-4 space-y-3 border-t border-mkf-border pt-4 text-sm">
                      {submissionDetails(row).map(({ label, value }) => (
                        <div key={label}>
                          <dt className="font-medium text-mkf-fg">{label}</dt>
                          <dd className="mt-1 whitespace-pre-wrap leading-relaxed text-mkf-muted">{value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                  <div className="flex shrink-0 flex-wrap gap-2">
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => {
                        window.location.href = `mailto:${row.email}`;
                      }}
                    >
                      Reply
                    </Button>
                    <Button type="button" variant="secondary" onClick={() => void removeSubmission(row._id)}>
                      Delete
                    </Button>
                  </div>
                </div>
              </Card>
            </li>
          ))}
        </ul>
      </section>

      {err && <p className="text-sm text-red-600">{err}</p>}
    </div>
  );
}
