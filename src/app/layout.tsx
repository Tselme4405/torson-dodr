import type { Metadata } from "next";
import "./globals.css";

import {
  Delius_Unicase,
  Geist,
  Geist_Mono,
  Playfair_Display,
  Dancing_Script,
} from "next/font/google";

const delius = Delius_Unicase({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-delius",
});

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-playfair",
});

const dancing = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-dancing",
});

export const metadata: Metadata = {
  title: "Birthday",
  description: "Birthday greeting site",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${dancing.variable} ${delius.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
