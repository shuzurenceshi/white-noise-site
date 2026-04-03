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

export const metadata: Metadata = {
  title: "白噪音 - 专注、放松、助眠",
  description: "免费在线白噪音播放器，支持多种环境音效混合，帮助您专注工作、放松心情或快速入睡",
  keywords: ["白噪音", "助眠", "专注", "放松", "雨声", "海浪"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-900">{children}</body>
    </html>
  );
}
