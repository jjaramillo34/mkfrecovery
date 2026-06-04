import { AdminPage } from "@/components/admin/admin-page";
import { NewsletterSubscribersManager } from "@/components/admin/newsletter-subscribers-manager";

export const metadata = {
  title: "Admin · Newsletter",
};

export default function AdminNewsletterPage() {
  return (
    <AdminPage
      title="Newsletter subscribers"
      description="View emails collected from the homepage signup form. Unsubscribe or export the list for Resend broadcasts."
    >
      <NewsletterSubscribersManager />
    </AdminPage>
  );
}
