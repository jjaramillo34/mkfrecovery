import { AdminPage } from "@/components/admin/admin-page";
import { GalleryCategoriesManager } from "@/components/admin/gallery-categories-manager";

export const metadata = {
  title: "Admin · Gallery categories",
};

export default function AdminGalleryCategoriesPage() {
  return (
    <AdminPage
      title="Gallery categories"
      description="Create and manage the groups shown on the public gallery. Each category has its own upload page."
    >
      <GalleryCategoriesManager />
    </AdminPage>
  );
}
