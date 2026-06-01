import { AdminPage } from "@/components/admin/admin-page";
import { SecuritySettings } from "@/components/admin/security-settings";

export const metadata = {
  title: "Admin · Security",
};

export default function AdminSecurityPage() {
  return (
    <AdminPage
      title="Security & MFA"
      description="Protect your admin account with a time-based one-time password (TOTP) from Google Authenticator, 1Password, Authy, or similar apps."
    >
      <SecuritySettings />
    </AdminPage>
  );
}
