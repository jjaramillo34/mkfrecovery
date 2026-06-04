import { AdminPage } from "@/components/admin/admin-page";
import { TestimonialsManager } from "@/components/admin/testimonials-manager";

export const metadata = {
  title: "Admin · Testimonials",
};

export default function AdminTestimonialsPage() {
  return (
    <AdminPage
      title="Recovery testimonials"
      description="Add and publish recovery stories for the memorial carousel on the homepage, mission, and donate pages."
    >
      <TestimonialsManager />
    </AdminPage>
  );
}
