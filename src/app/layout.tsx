/**
 * Root layout component for the Hedgar Construction showcase website.
 * Wraps all pages with the navigation bar and footer.
 * @module app/layout
 */

import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hedgar Construction | Building Tomorrow's Landmarks Today",
  description:
    "Hedgar Construction is a premier construction company delivering world-class commercial, residential, and infrastructure projects across the United States.",
  keywords: [
    "construction",
    "building",
    "commercial construction",
    "residential construction",
    "infrastructure",
    "general contractor",
  ],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
};

/**
 * Root layout that provides the common UI structure for all pages.
 * Includes the responsive Navbar at the top and comprehensive Footer at the bottom.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <body className="min-h-screen bg-white text-primary antialiased">
        {/* React 19 hoists this <link> into <head>; warms up the hero LCP image. */}
        <link
          rel="preload"
          href="/assets/images/hero-poster.webp"
          as="image"
          type="image/webp"
        />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
