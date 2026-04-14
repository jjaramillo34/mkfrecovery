export const site = {
  name: "Michael Kellermann Foundation",
  shortName: "MKF",
  slogan: "Break the Chain",
  description:
    "The Michael Kellermann Foundation advances community-centered drug prevention through education, partnership, and compassionate support for families, schools, and young people.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://mkf.example.org",
  email: "hello@mkf.example.org",
  phone: "(555) 123-4567",
  address: "Community Resource Center\n120 Hope Street, Suite 300\nYour City, ST 00000",
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
  { label: "Resources", href: "/resources" },
  { label: "Get Involved", href: "/get-involved" },
  { label: "Donate", href: "/donate" },
  { label: "Contact", href: "/contact" },
];

export const footerNav: NavItem[] = [
  { label: "Home", href: "/" },
  ...mainNav,
];
