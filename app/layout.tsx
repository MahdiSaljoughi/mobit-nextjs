"use client";

import "./globals.css";
import MainFooter from "@/components/Footer/MainFooter";
import MainHeader from "@/components/Header/MainHeader";
import { Toaster } from "@/components/ui/sonner";
import { Provider } from "react-redux";
import { store } from "@/store/store";
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
          <Provider store={store}>
            <div className="font-[iran]">
              <MainHeader />
              <main>{children}</main>
              <Toaster />
              <MainFooter />
            </div>
          </Provider>
        </SessionProvider>
      </body>
    </html>
  );
}
