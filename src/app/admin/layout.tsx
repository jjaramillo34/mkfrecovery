import "@once-ui-system/core/css/styles.css";
import "@once-ui-system/core/css/tokens.css";
import "./admin-once.css";

import { ThemeInit } from "@once-ui-system/core";
import type { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { AdminShell } from "@/components/admin/admin-shell";
import { OnceAdminProviders } from "@/components/admin/once-ui-providers";
import { adminDataStyle, adminStyle } from "@/resources/admin/once-ui.config";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <ThemeInit
        config={{
          theme: adminStyle.theme,
          brand: adminStyle.brand,
          accent: adminStyle.accent,
          neutral: adminStyle.neutral,
          solid: adminStyle.solid,
          "solid-style": adminStyle.solidStyle,
          border: adminStyle.border,
          surface: adminStyle.surface,
          transition: adminStyle.transition,
          scaling: adminStyle.scaling,
          "viz-style": adminDataStyle.variant,
        }}
      />
      <OnceAdminProviders>
        <SessionProvider>
          <AdminShell>{children}</AdminShell>
        </SessionProvider>
      </OnceAdminProviders>
    </>
  );
}
