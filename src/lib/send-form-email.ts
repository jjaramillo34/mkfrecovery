import { markFormSubmissionEmailSent, saveFormSubmission } from "@/lib/form-submissions";
import { getFormsFromAddress, getFormsNotifyEmail, getResendClient, isFormsEmailConfigured } from "@/lib/resend-client";
import { site } from "@/lib/site";

export type FormEmailResult = { ok: true } | { ok: false; message: string; status: number };

function resendErrorMessage(error: { name?: string; message: string }): string {
  const msg = error.message.toLowerCase();
  if (msg.includes("domain is not verified") || msg.includes("not verified")) {
    return "domain_not_verified";
  }
  return error.message;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function row(label: string, value: string) {
  return `<tr><td style="padding:8px 12px 8px 0;font-weight:600;vertical-align:top;color:#334155;white-space:nowrap;">${escapeHtml(label)}</td><td style="padding:8px 0;color:#0f172a;">${escapeHtml(value)}</td></tr>`;
}

function wrapEmailHtml(title: string, rows: string, messageBlock?: string) {
  return `
    <div style="font-family:system-ui,-apple-system,sans-serif;line-height:1.6;color:#0f172a;max-width:640px;">
      <p style="margin:0 0 16px;font-size:18px;font-weight:600;">${escapeHtml(title)}</p>
      <table style="border-collapse:collapse;width:100%;margin-bottom:16px;">${rows}</table>
      ${messageBlock ?? ""}
      <p style="margin-top:24px;font-size:13px;color:#64748b;">Sent via ${escapeHtml(site.name)} website</p>
    </div>
  `.trim();
}

export async function sendContactFormEmail(input: {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  roleLabel: string;
  message: string;
}): Promise<FormEmailResult> {
  const fullName = `${input.firstName} ${input.lastName}`.trim();
  const submissionId = await saveFormSubmission({
    type: "contact",
    email: input.email,
    name: fullName,
    payload: {
      firstName: input.firstName,
      lastName: input.lastName,
      role: input.role,
      roleLabel: input.roleLabel,
      message: input.message,
    },
    emailSent: false,
  });

  if (!isFormsEmailConfigured()) {
    return {
      ok: false,
      status: 503,
      message: "Contact form is not configured yet. Please try again later or email us directly.",
    };
  }

  const resend = getResendClient();
  const from = getFormsFromAddress();
  const to = getFormsNotifyEmail();

  const html = wrapEmailHtml(
    "New contact message",
    [
      row("Name", fullName),
      row("Email", input.email),
      row("I am a…", input.roleLabel),
    ].join(""),
    `<p style="margin:16px 0 8px;font-weight:600;color:#334155;">Message</p><p style="margin:0;white-space:pre-wrap;">${escapeHtml(input.message)}</p>`,
  );

  const result = await resend.emails.send({
    from,
    to: [to],
    replyTo: input.email,
    subject: `[MKF Contact] Message from ${fullName}`,
    html,
  });

  if (result.error) {
    console.error("Contact form email failed:", result.error.message);
    if (resendErrorMessage(result.error) === "domain_not_verified") {
      return {
        ok: false,
        status: 503,
        message:
          "Email sending is not fully set up yet. The From address must use your verified Resend domain (e.g. contact@newsletter.mkfrecovery.org).",
      };
    }
    return {
      ok: false,
      status: 502,
      message: "We could not send your message. Please try again or email us directly.",
    };
  }

  await markFormSubmissionEmailSent(submissionId);
  return { ok: true };
}

export async function sendVolunteerFormEmail(input: {
  name: string;
  email: string;
  interests: string;
  availability?: string;
}): Promise<FormEmailResult> {
  const submissionId = await saveFormSubmission({
    type: "volunteer",
    email: input.email,
    name: input.name,
    payload: {
      interests: input.interests,
      availability: input.availability ?? "",
    },
    emailSent: false,
  });

  if (!isFormsEmailConfigured()) {
    return {
      ok: false,
      status: 503,
      message: "Volunteer form is not configured yet. Please try again later or email us directly.",
    };
  }

  const resend = getResendClient();
  const from = getFormsFromAddress();
  const to = getFormsNotifyEmail();

  const html = wrapEmailHtml(
    "New volunteer interest",
    [
      row("Name", input.name),
      row("Email", input.email),
      row("Availability", input.availability ?? "Not specified"),
    ].join(""),
    `<p style="margin:16px 0 8px;font-weight:600;color:#334155;">Interests & skills</p><p style="margin:0;white-space:pre-wrap;">${escapeHtml(input.interests)}</p>`,
  );

  const result = await resend.emails.send({
    from,
    to: [to],
    replyTo: input.email,
    subject: `[MKF Volunteer] Interest from ${input.name}`,
    html,
  });

  if (result.error) {
    console.error("Volunteer form email failed:", result.error.message);
    if (resendErrorMessage(result.error) === "domain_not_verified") {
      return {
        ok: false,
        status: 503,
        message:
          "Email sending is not fully set up yet. The From address must use your verified Resend domain (e.g. contact@newsletter.mkfrecovery.org).",
      };
    }
    return {
      ok: false,
      status: 502,
      message: "We could not send your interest form. Please try again or email us directly.",
    };
  }

  await markFormSubmissionEmailSent(submissionId);
  return { ok: true };
}

export function getFormsEmailSettings() {
  return {
    from: getFormsFromAddress(),
    notifyEmail: getFormsNotifyEmail(),
    configured: isFormsEmailConfigured(),
  };
}
