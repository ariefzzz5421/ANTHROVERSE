import type { Metadata } from "next";
import "./globals.css";
import { Shell } from "@/components/shell";
import { siteUrl } from "@/lib/site";
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: {
    default: "ANTHROVERSE — Explore Humanity Across Time",
    template: "%s | ANTHROVERSE",
  },
  description:
    "An interactive, evidence-aware museum of human evolution, cultures, behavior, and history.",
  openGraph: {
    title: "ANTHROVERSE",
    description: "Explore Humanity Across Time",
    images: ["/museum-panorama.webp"],
    type: "website",
  },
  robots: { index: true, follow: true },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
