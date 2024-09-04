"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import MainFooter from "@/components/Footer/MainFooter";
import MainHeader from "@/components/Header/MainHeader";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" dir="rtl">
      <head>
        <title>توسعه داده شده با Next-js</title>
        <link rel="shortcut icon" href="favicon.png" type="image/x-icon" />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="font-[fontd3]">
            <MainHeader />
            <main className="bg-zinc-50 dark:bg-zinc-900">{children}</main>
            <Toaster />
            <MainFooter />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
// rfc
