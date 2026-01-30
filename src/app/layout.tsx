import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { ScrollIndicator } from "@/components/ScrollIndicator";
import { Preloader } from "@/components/Preloader";
import { HashScroll } from "@/components/HashScroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SiteLift | High-Performance Next.js Digital Transformation",
  description: "Transform your website into a high-performance business asset. We migrate WordPress, Webflow, and Framer sites to Next.js with 100/100 Lighthouse scores.",
  keywords: ["Next.js", "Web Performance", "SEO", "WordPress Migration", "Webflow to Next.js", "React", "Digital Transformation"],
  authors: [{ name: "SiteLift Team" }],
  openGraph: {
    title: "SiteLift | Next.js Excellence",
    description: "Ultra-fast, conversion-focused Next.js experiences.",
    url: "https://sitelift.io",
    siteName: "SiteLift",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SiteLift Performance Architecture",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SiteLift | Next.js Excellence",
    description: "Ultra-fast Next.js transformation.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-white selection:text-black`}
      >
        <HashScroll />
        <Preloader />
        <SmoothScroll>
          {children}
        </SmoothScroll>
        <ScrollIndicator />
      </body>
    </html>
  );
}
