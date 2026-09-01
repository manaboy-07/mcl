import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import SmoothScroll from "@/components/SmoothScroll";
import Footer from "@/components/Footer";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Manifold Computers Limited",
  description: "The website of Manifold Computer Limited",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${dmSans.variable} h-full antialiased`}>
      <body className={`${dmSans.className} min-h-full flex flex-col`}>
        <Providers>
          <SmoothScroll>{children}</SmoothScroll>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
