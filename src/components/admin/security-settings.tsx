"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function SecuritySettings() {
  const { data: session, update } = useSession();
  const [qr, setQr] = useState<string | null>(null);
  const [manualSecret, setManualSecret] = useState<string | null>(null);
  const [code, setCode] = useState("");
  const [disablePassword, setDisablePassword] = useState("");
  const [disableTotp, setDisableTotp] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function startSetup() {
    setMsg(null);
    setErr(null);
    setPending(true);
    const r = await fetch("/api/admin/mfa/setup", { method: "POST" });
    setPending(false);
    if (!r.ok) {
      const j = (await r.json().catch(() => ({}))) as { error?: string };
      setErr(j.error ?? "Could not start MFA setup");
      return;
    }
    const j = (await r.json()) as { qrDataUrl: string; secret: string };
    setQr(j.qrDataUrl);
    setManualSecret(j.secret);
  }

  async function activate(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    setErr(null);
    setPending(true);
    const r = await fetch("/api/admin/mfa/activate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    });
    setPending(false);
    if (!r.ok) {
      setErr("Invalid code — try again");
      return;
    }
    setQr(null);
    setManualSecret(null);
    setCode("");
    setMsg("MFA is now enabled. You will need your authenticator app each time you sign in.");
    await update();
  }

  async function disableMfa(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    setErr(null);
    setPending(true);
    const r = await fetch("/api/admin/mfa/disable", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: disablePassword, totp: disableTotp }),
    });
    setPending(false);
    if (!r.ok) {
      const j = (await r.json().catch(() => ({}))) as { error?: string };
      setErr(j.error ?? "Could not disable MFA");
      return;
    }
    setDisablePassword("");
    setDisableTotp("");
    setMsg("MFA has been disabled.");
    await update();
  }

  return (
    <div className="max-w-lg space-y-6">
      <Card className="p-5">
        <p className="text-sm text-mkf-muted">
          Signed in as <strong className="text-mkf-ink">{session?.user?.email}</strong>
        </p>
      </Card>

      {!qr ? (
        <Card className="p-5 space-y-4">
          <h2 className="font-display text-lg font-semibold text-mkf-ink">Enable MFA</h2>
          <p className="text-sm text-mkf-muted">Scan a QR code with your authenticator app, then confirm with a code.</p>
          <Button type="button" variant="primary" disabled={pending} onClick={() => void startSetup()}>
            {pending ? "Preparing…" : "Set up authenticator"}
          </Button>
        </Card>
      ) : (
        <Card className="p-5 space-y-4">
          <h2 className="font-display text-lg font-semibold text-mkf-ink">Scan QR code</h2>
          <div className="relative mx-auto h-48 w-48">
            <Image src={qr} alt="MFA QR code" fill className="object-contain" unoptimized />
          </div>
          {manualSecret && (
            <p className="break-all text-center font-mono text-xs text-mkf-muted">
              Manual key: {manualSecret}
            </p>
          )}
          <form className="space-y-3" onSubmit={activate}>
            <label className="block text-sm font-medium">6-digit code</label>
            <input
              className="w-full rounded-md border border-mkf-border bg-mkf-bg px-3 py-2 text-sm tracking-widest"
              inputMode="numeric"
              maxLength={6}
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
              required
            />
            <Button type="submit" variant="primary" disabled={pending}>
              {pending ? "Verifying…" : "Enable MFA"}
            </Button>
          </form>
        </Card>
      )}

      <Card className="p-5 space-y-4">
        <h2 className="font-display text-lg font-semibold text-mkf-ink">Disable MFA</h2>
        <p className="text-sm text-mkf-muted">Requires your password and a current authenticator code.</p>
        <form className="space-y-3" onSubmit={disableMfa}>
          <input
            type="password"
            placeholder="Password"
            className="w-full rounded-md border border-mkf-border bg-mkf-bg px-3 py-2 text-sm"
            value={disablePassword}
            onChange={(e) => setDisablePassword(e.target.value)}
            required
          />
          <input
            type="text"
            inputMode="numeric"
            placeholder="Authenticator code"
            className="w-full rounded-md border border-mkf-border bg-mkf-bg px-3 py-2 text-sm tracking-widest"
            maxLength={6}
            value={disableTotp}
            onChange={(e) => setDisableTotp(e.target.value.replace(/\D/g, ""))}
            required
          />
          <Button type="submit" variant="secondary" disabled={pending}>
            Disable MFA
          </Button>
        </form>
      </Card>

      {msg && <p className="text-sm text-mkf-teal">{msg}</p>}
      {err && <p className="text-sm text-red-600">{err}</p>}
    </div>
  );
}
