import { AdminPage } from "@/components/admin/admin-page";
import { FormsSubmissionsManager } from "@/components/admin/forms-submissions-manager";

export const metadata = {
  title: "Admin · Forms",
};

export default function AdminFormsPage() {
  return (
    <AdminPage
      title="Contact & volunteer forms"
      description="View messages from the public Contact and Get Involved forms. Notifications are emailed to contact@mkfrecovery.org via Resend."
    >
      <FormsSubmissionsManager />
    </AdminPage>
  );
}
