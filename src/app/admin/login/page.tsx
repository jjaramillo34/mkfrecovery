"use client";

import {
  Button,
  Card,
  Column,
  Feedback,
  Heading,
  Input,
  PasswordInput,
  Text,
} from "@once-ui-system/core";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [totp, setTotp] = useState("");
  const [step, setStep] = useState<"credentials" | "mfa">("credentials");
  const [err, setErr] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const router = useRouter();
  const search = useSearchParams();
  const callbackUrl = search.get("callbackUrl") || "/admin";

  async function onCredentials(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setPending(true);
    const r = await fetch("/api/auth/check-credentials", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    setPending(false);
    if (!r.ok) {
      setErr("Invalid email or password");
      return;
    }
    const j = (await r.json()) as { requiresMfa?: boolean };
    if (j.requiresMfa) {
      setStep("mfa");
      return;
    }
    await completeSignIn("");
  }

  async function onMfa(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    await completeSignIn(totp);
  }

  async function completeSignIn(mfaCode: string) {
    setPending(true);
    const result = await signIn("credentials", {
      email,
      password,
      totp: mfaCode,
      redirect: false,
      callbackUrl: callbackUrl.startsWith("/admin") ? callbackUrl : "/admin",
    });
    setPending(false);
    if (result?.error) {
      setErr(step === "mfa" ? "Invalid authenticator code" : "Invalid email or password");
      return;
    }
    router.push(callbackUrl.startsWith("/admin") ? callbackUrl : "/admin");
    router.refresh();
  }

  return (
    <Card padding="24" maxWidth={28} fillWidth>
      <Column gap="20" fillWidth>
        <Column gap="8">
          <Heading as="h1" variant="display-strong-xs">
            Admin sign in
          </Heading>
          <Text variant="body-default-s" onBackground="neutral-weak">
            Sign in with your admin account. MFA is required when enabled on your user.
          </Text>
        </Column>

        {step === "credentials" ? (
          <form style={{ width: "100%" }} onSubmit={onCredentials}>
          <Column gap="16" fillWidth>
            <Input
              id="admin-email"
              label="Email"
              type="email"
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <PasswordInput
              id="admin-pw"
              label="Password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {err && <Feedback variant="danger" description={err} />}
            <Button type="submit" variant="primary" fillWidth disabled={pending}>
              {pending ? "Checking…" : "Continue"}
            </Button>
          </Column>
          </form>
        ) : (
          <form style={{ width: "100%" }} onSubmit={onMfa}>
          <Column gap="16" fillWidth>
            <Text variant="body-default-s" onBackground="neutral-weak">
              Enter the 6-digit code from your authenticator app.
            </Text>
            <Input
              id="admin-totp"
              label="Authenticator code"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={6}
              value={totp}
              onChange={(e) => setTotp(e.target.value.replace(/\D/g, ""))}
              required
            />
            {err && <Feedback variant="danger" description={err} />}
            <Button type="submit" variant="primary" fillWidth disabled={pending}>
              {pending ? "Signing in…" : "Sign in"}
            </Button>
            <Button type="button" variant="tertiary" fillWidth onClick={() => { setStep("credentials"); setTotp(""); setErr(null); }}>
              ← Back
            </Button>
          </Column>
          </form>
        )}
      </Column>
    </Card>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<Text onBackground="neutral-weak">Loading…</Text>}>
      <LoginForm />
    </Suspense>
  );
}
