import type { Metadata } from "next";
import { JetBrains_Mono, Manrope } from "next/font/google";
import type { ReactNode } from "react";
import "../styles/globals.css";

const display = Manrope({ subsets: ["latin", "vietnamese"], variable: "--font-manrope" });
const mono = JetBrains_Mono({ subsets: ["latin", "vietnamese"], variable: "--font-jetbrains" });

export const metadata: Metadata = {
  title: { default: "MRT Materials", template: "%s | MRT Materials" },
  description: "Raw materials, ingredients, chemicals and industrial materials for manufacturers in Vietnam.",
  metadataBase: new URL("https://mrtmaterials.com"),
  icons: { icon: "/brand/brand-mark.svg" },
  verification: { google: "PgBcJy5BZjCCxG96MmjHNnhTovuZDZ2HAxde2I-uRyk" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
};

type RootLayoutProps = Readonly<{ children: ReactNode }>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${display.variable} ${mono.variable}`}>{children}</body>
    </html>
  );
}
