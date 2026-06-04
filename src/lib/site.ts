export const site = {
  name: "Michael Kellermann Foundation",
  shortName: "MKF",
  slogan: "Break the Chain",
  description:
    "The Michael Kellermann Foundation advances community-centered support for addiction recovery, sobriety, and a fuller life—through education, partnership, and compassionate care for people of all ages, families, and other organizations.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? (process.env.NODE_ENV === "production" ? "https://mkfrecovery.org" : "http://localhost:3000"),
  /** Set to your public Givebutter campaign or form URL. Checkout and card data stay on Givebutter. */
  givebutterCampaignUrl: (process.env.NEXT_PUBLIC_GIVEBUTTER_URL ?? "").trim(),
  email: "mkfrecovery@gmail.com",
  phone: "(347) 848-7930",
  /** Mailing address on Contact and footer. Set NEXT_PUBLIC_SITE_ADDRESS to override. */
  address: (process.env.NEXT_PUBLIC_SITE_ADDRESS ?? "Michael Kellermann Foundation\nNew York, NY").trim(),
  social: {
    facebook: "https://www.facebook.com/",
    instagram: "https://www.instagram.com/",
    linkedin: "https://www.linkedin.com/",
  },
} as const;

export type NavItem = { label: string; href: string };

export const mainNav: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Mission & Vision", href: "/mission" },
  { label: "Programs", href: "/programs" },
  { label: "Gallery", href: "/gallery" },
  { label: "Get Involved", href: "/get-involved" },
  { label: "Donate", href: "/donate" },
  { label: "Contact", href: "/contact" },
];

export const footerNav: NavItem[] = [
  { label: "Home", href: "/" },
  ...mainNav,
];
