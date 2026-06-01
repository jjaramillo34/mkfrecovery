import { AdminPage } from "@/components/admin/admin-page";
import { EventsManager } from "@/components/admin/events-manager";

export const metadata = {
  title: "Admin · Events",
};

export default function AdminEventsPage() {
  return (
    <AdminPage
      title="Events & Givebutter"
      description='Each event can have its own Givebutter link. "Use for Donate" makes that link the default on the public Donate page.'
    >
      <EventsManager />
    </AdminPage>
  );
}
