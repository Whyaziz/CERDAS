import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";
import { ScrollProvider } from "@/contexts/ScrollContext";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CERDAS - Cek Elektronik Rekomendasi dan Analisis Stunting",
  description:
    "Platform untuk menganalisis dan merekomendasikan intervensi stunting pada anak",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <ScrollProvider>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </ScrollProvider>
        <Analytics mode="production" />
      </body>
    </html>
  );
}
