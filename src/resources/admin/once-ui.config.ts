/** Once UI theme tokens for the admin app (blue brand, system light/dark). */
export const adminStyle = {
  theme: "system" as const,
  neutral: "slate" as const,
  brand: "blue" as const,
  accent: "cyan" as const,
  solid: "contrast" as const,
  solidStyle: "flat" as const,
  border: "rounded" as const,
  surface: "filled" as const,
  transition: "all" as const,
  scaling: "100" as const,
};

export const adminDataStyle = {
  variant: "gradient" as const,
  mode: "categorical" as const,
  height: 24,
  axis: {
    stroke: "var(--neutral-alpha-weak)",
  },
  tick: {
    fill: "var(--neutral-on-background-weak)",
    fontSize: 11,
    line: false,
  },
};
