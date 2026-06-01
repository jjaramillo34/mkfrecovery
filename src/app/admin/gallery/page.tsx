import { SmartLink, Text } from "@once-ui-system/core";
import { AdminPage } from "@/components/admin/admin-page";
import { GalleryHub } from "@/components/admin/gallery-hub";

export const metadata = {
  title: "Admin · Gallery",
};

export default function AdminGalleryPage() {
  return (
    <AdminPage
      title="Gallery"
      description={
        <>
          Pick a category to upload and organize photos. Manage category names and filters under{" "}
          <SmartLink href="/admin/gallery/categories">
            <Text as="span" variant="label-strong-s" onBackground="brand-medium">
              Gallery categories
            </Text>
          </SmartLink>
          .
        </>
      }
    >
      <GalleryHub />
    </AdminPage>
  );
}
