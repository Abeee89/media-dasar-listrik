import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import { Navbar } from "@/components/layout/Navbar";
import { Chatbot } from "@/components/layout/Chatbot";

export const metadata: Metadata = {
  title: "Basic Electricity EdTech",
  description: "Interactive learning platform for vocational high schools",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-50">
        <Navbar />
        <main className="flex-1 flex flex-col">
          {children}
        </main>
        <Chatbot />
      </body>
    </html>
  );
}
