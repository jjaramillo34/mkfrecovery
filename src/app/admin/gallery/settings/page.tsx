import { AdminPage } from "@/components/admin/admin-page";
import { GallerySettingsManager } from "@/components/admin/gallery-settings-manager";

export const metadata = {
  title: "Admin · Gallery settings",
};

export default function AdminGallerySettingsPage() {
  return (
    <AdminPage
      title="Gallery settings"
      description="Global defaults for the public gallery—how many photos load, grid layout, filters, and intro text."
    >
      <GallerySettingsManager />
    </AdminPage>
  );
}
