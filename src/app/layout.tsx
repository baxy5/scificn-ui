import type { Metadata } from "next";
import "@/styles/globals.css";
import { ThemeInitScript } from "./_components/theme-init-script";

export const metadata: Metadata = {
  title: {
    template: "%s — scificn-ui",
    default: "scificn-ui | Retro Sci-Fi React UI Components",
  },
  description:
    "A copy-paste retro sci-fi React component library. Cassette Futurism design system with phosphor glow, corner notches, and terminal aesthetics. Built on Radix UI and Tailwind CSS v4.",
  metadataBase: new URL("https://www.scificn.dev"),
  openGraph: { siteName: "scificn-ui", type: "website" },
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
