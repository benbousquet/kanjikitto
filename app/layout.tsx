import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar";
import Head from "next/head";

export const metadata: Metadata = {
  title: "Kanji Kitto",
  description: "Learn Kanji through writing!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width" />
      </Head>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
