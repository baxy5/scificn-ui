import type { Metadata } from "next";
import "@/styles/globals.css";
import { ThemeInitScript } from "./_components/theme-init-script";

const BASE = "https://www.scificn.dev";
const TITLE = "scificn-ui | Retro Sci-Fi React UI Components";
const DESCRIPTION =
  "A copy-paste retro sci-fi React component library. Cassette Futurism design system with phosphor glow, corner notches, and terminal aesthetics. Built on Radix UI and Tailwind CSS v4.";

const OG_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "scificn-ui — Retro Sci-Fi React UI Components",
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE),

  title: {
    template: "%s — scificn-ui",
    default: TITLE,
  },
  description: DESCRIPTION,
  keywords: [
    "React UI components",
    "sci-fi design system",
    "cassette futurism",
    "Tailwind CSS v4",
    "Radix UI",
    "retro components",
    "component library",
    "phosphor glow",
    "terminal UI",
  ],
  authors: [{ name: "bakszy5", url: "https://x.com/bakszy5" }],
  creator: "bakszy5",

  openGraph: {
    type: "website",
    url: BASE,
    siteName: "scificn-ui",
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
    site: "@bakszy5",
    creator: "@bakszy5",
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: { icon: "/logo.svg" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeInitScript />
      </head>
      <body>{children}</body>
    </html>
  );
}
