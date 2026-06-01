import { AdminPage } from "@/components/admin/admin-page";
import { GalleryCategoryImages } from "@/components/admin/gallery-category-images";

export const metadata = {
  title: "Admin · Gallery category",
};

export default async function AdminGalleryCategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <AdminPage title={`Gallery · ${slug}`} description="Upload multiple photos and drag to set display order.">
      <GalleryCategoryImages slug={slug} />
    </AdminPage>
  );
}
