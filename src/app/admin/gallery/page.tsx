import { SmartLink, Text } from "@once-ui-system/core";
import { AdminPage } from "@/components/admin/admin-page";
import { GalleryManager } from "@/components/admin/gallery-manager";

export const metadata = {
  title: "Admin · Gallery",
};

export default function AdminGalleryPage() {
  return (
    <AdminPage
      title="Gallery (ImageKit)"
      description={
        <>
          Create categories, upload images, and set display order. View the{" "}
          <SmartLink href="/gallery" target="_blank">
            <Text as="span" variant="label-strong-s" onBackground="brand-medium">
              public gallery
            </Text>
          </SmartLink>
          .
        </>
      }
    >
      <GalleryManager />
    </AdminPage>
  );
}
