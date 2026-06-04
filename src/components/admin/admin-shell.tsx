"use client";

import { Button, Column, Flex, Icon, Row, SmartLink, Text } from "@once-ui-system/core";
import { signOut, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import type { AdminIconName } from "@/resources/admin/icons";

const nav: { href: string; label: string; icon: AdminIconName }[] = [
  { href: "/admin", label: "Dashboard", icon: "dashboard" },
  { href: "/admin/events", label: "Events & Givebutter", icon: "events" },
  { href: "/admin/testimonials", label: "Testimonials", icon: "testimonials" },
  { href: "/admin/newsletter", label: "Newsletter", icon: "newsletter" },
  { href: "/admin/gallery", label: "Gallery", icon: "gallery" },
  { href: "/admin/gallery/categories", label: "Gallery categories", icon: "categories" },
  { href: "/admin/users", label: "Admin users", icon: "users" },
  { href: "/admin/security", label: "Security & MFA", icon: "security" },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();

  async function logout() {
    await signOut({ redirect: false });
    router.push("/admin/login");
    router.refresh();
  }

  if (pathname === "/admin/login" || pathname.startsWith("/admin/login/")) {
    return (
      <div
        data-admin-once
        className="flex min-h-dvh w-full items-center justify-center bg-[var(--page-background)] p-4 sm:p-6"
      >
        {children}
      </div>
    );
  }

  return (
    <Column as="div" data-admin-once background="page" fillWidth fillHeight>
      <Row
        as="header"
        fillWidth
        paddingX="20"
        paddingY="12"
        horizontal="between"
        vertical="center"
        borderBottom="neutral-alpha-medium"
        background="surface"
      >
        <Row gap="12" vertical="center">
          <SmartLink href="/">
            <Text variant="label-strong-s" onBackground="brand-medium">
              ← Site
            </Text>
          </SmartLink>
          <Text variant="label-default-s" onBackground="neutral-weak">
            |
          </Text>
          <Text variant="label-strong-s" onBackground="accent-medium">
            MKF Admin
          </Text>
        </Row>
        <Row gap="12" vertical="center">
          {session?.user?.email && (
            <Text variant="label-default-s" onBackground="neutral-weak" className="hidden sm:inline">
              {session.user.email}
            </Text>
          )}
          <Button variant="secondary" size="s" prefixIcon="logout" onClick={() => void logout()}>
            Log out
          </Button>
        </Row>
      </Row>

      <Flex fillWidth fillHeight style={{ minHeight: 0 }}>
        <Column
          as="nav"
          paddingX="12"
          paddingY="16"
          gap="4"
          borderRight="neutral-alpha-medium"
          background="surface"
          style={{ width: "15rem", flexShrink: 0 }}
        >
          {nav.map((item) => {
            const isActive =
              item.href === "/admin/gallery"
                ? pathname === "/admin/gallery" || /^\/admin\/gallery\/[^/]+$/.test(pathname)
                : pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
            return (
              <SmartLink key={item.href} href={item.href} fillWidth>
                <Row
                  fillWidth
                  paddingX="12"
                  paddingY="8"
                  gap="8"
                  radius="m"
                  vertical="center"
                  background={isActive ? "brand-alpha-weak" : undefined}
                >
                  <Icon
                    name={item.icon}
                    size="s"
                    onBackground={isActive ? "brand-strong" : "neutral-medium"}
                  />
                  <Text
                    variant="label-strong-s"
                    onBackground={isActive ? "brand-strong" : "neutral-medium"}
                  >
                    {item.label}
                  </Text>
                </Row>
              </SmartLink>
            );
          })}
        </Column>

        <Column as="main" fillWidth flex={1} paddingX="24" paddingY="16" style={{ minWidth: 0, overflow: "auto" }}>
          {children}
        </Column>
      </Flex>
    </Column>
  );
}
