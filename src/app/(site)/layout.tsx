import type { ReactNode } from "react";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { ThemeProvider } from "@/components/providers/theme-provider";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <Header />
      <main id="main-content">{children}</main>
      <Footer />
    </ThemeProvider>
  );
}
