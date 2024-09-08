"use client";

import "./globals.css";
import MainFooter from "@/components/Footer/MainFooter";
import MainHeader from "@/components/Header/MainHeader";
import { Toaster } from "@/components/ui/sonner";
import { CartContextProvider } from "@/contexts/cart";
import { SessionProvider } from "next-auth/react";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" dir="rtl">
      <head>
        <title>فروشگاه اینترنتی مبیت</title>
        <link rel="shortcut icon" href="icon.png" type="image/x-icon" />
      </head>
      <body>
        <SessionProvider>
          <CartContextProvider>
            <div className="font-[iran]">
              <MainHeader />
              <main>{children}</main>
              <Toaster />
              <MainFooter />
            </div>
          </CartContextProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
