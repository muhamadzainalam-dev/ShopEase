import localFont from "next/font/local";
import "./globals.css";

import Header from "@/components/custom/Header";
import SessionWrapper from "@/components/custom/SessionWrapper";
import Footer from "@/components/custom/Footer";
import { Toaster } from "@/components/ui/toaster";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "shopease.pk.com",
  description: "e-commerce website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <SessionWrapper>
        <body>
          <Header />
          {children}
          <Footer />
          <Toaster />
        </body>
      </SessionWrapper>
    </html>
  );
}
