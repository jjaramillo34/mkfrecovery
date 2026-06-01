"use client";

import {
  type BorderStyle,
  type ChartMode,
  type ChartVariant,
  DataThemeProvider,
  IconProvider,
  LayoutProvider,
  type NeutralColor,
  type ScalingSize,
  type Schemes,
  type SolidStyle,
  type SolidType,
  type SurfaceStyle,
  ThemeProvider,
  ToastProvider,
  type TransitionStyle,
} from "@once-ui-system/core";
import type { ReactNode } from "react";
import { adminDataStyle, adminStyle } from "@/resources/admin/once-ui.config";
import { adminIconLibrary } from "@/resources/admin/icons";

export function OnceAdminProviders({ children }: { children: ReactNode }) {
  return (
    <LayoutProvider>
      <ThemeProvider
        theme={adminStyle.theme}
        brand={adminStyle.brand as Schemes}
        accent={adminStyle.accent as Schemes}
        neutral={adminStyle.neutral as NeutralColor}
        solid={adminStyle.solid as SolidType}
        solidStyle={adminStyle.solidStyle as SolidStyle}
        border={adminStyle.border as BorderStyle}
        surface={adminStyle.surface as SurfaceStyle}
        transition={adminStyle.transition as TransitionStyle}
        scaling={adminStyle.scaling as ScalingSize}
      >
        <DataThemeProvider
          variant={adminDataStyle.variant as ChartVariant}
          mode={adminDataStyle.mode as ChartMode}
          height={adminDataStyle.height}
          axis={adminDataStyle.axis}
          tick={adminDataStyle.tick}
        >
          <ToastProvider>
            <IconProvider icons={adminIconLibrary}>{children}</IconProvider>
          </ToastProvider>
        </DataThemeProvider>
      </ThemeProvider>
    </LayoutProvider>
  );
}
