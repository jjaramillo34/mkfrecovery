import { AdminPage } from "@/components/admin/admin-page";
import { UsersManager } from "@/components/admin/users-manager";

export const metadata = {
  title: "Admin · Users",
};

export default function AdminUsersPage() {
  return (
    <AdminPage
      title="Admin users"
      description="Create accounts for people who can sign in to manage events and the gallery. Each user should enable MFA under Security after their first login."
    >
      <UsersManager />
    </AdminPage>
  );
}
