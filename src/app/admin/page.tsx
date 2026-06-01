import { Card, Column, Heading, Row, SmartLink, Text } from "@once-ui-system/core";
import { AdminPage } from "@/components/admin/admin-page";

export const metadata = {
  title: "Admin",
};

export default function AdminDashboard() {
  return (
    <AdminPage
      title="Dashboard"
      description="Manage events (Givebutter links), gallery images (ImageKit), and admin users with MFA."
    >
      <Row gap="16" fillWidth wrap>
        <Card padding="20" fillWidth style={{ flex: "1 1 16rem", maxWidth: "24rem" }}>
          <Column gap="12">
            <Heading as="h2" variant="heading-strong-s">
              Events & Givebutter
            </Heading>
            <Text variant="body-default-s" onBackground="neutral-weak">
              Set campaign URLs, dates, and which event powers the Donate page.
            </Text>
            <SmartLink href="/admin/events">
              <Text variant="label-strong-s" onBackground="brand-medium">
                Open events →
              </Text>
            </SmartLink>
          </Column>
        </Card>
        <Card padding="20" fillWidth style={{ flex: "1 1 16rem", maxWidth: "24rem" }}>
          <Column gap="12">
            <Heading as="h2" variant="heading-strong-s">
              Gallery
            </Heading>
            <Text variant="body-default-s" onBackground="neutral-weak">
              Categories, ImageKit uploads, and optional event scoping for filters.
            </Text>
            <SmartLink href="/admin/gallery">
              <Text variant="label-strong-s" onBackground="brand-medium">
                Open gallery →
              </Text>
            </SmartLink>
          </Column>
        </Card>
        <Card padding="20" fillWidth style={{ flex: "1 1 16rem", maxWidth: "24rem" }}>
          <Column gap="12">
            <Heading as="h2" variant="heading-strong-s">
              Admin users
            </Heading>
            <Text variant="body-default-s" onBackground="neutral-weak">
              Create accounts and require MFA under Security.
            </Text>
            <SmartLink href="/admin/users">
              <Text variant="label-strong-s" onBackground="brand-medium">
                Manage users →
              </Text>
            </SmartLink>
          </Column>
        </Card>
      </Row>
    </AdminPage>
  );
}
