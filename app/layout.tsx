"use client";

import "./globals.css";
import MainHeader from "@/components/Header/MainHeader";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";

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
              <Toaster position="top-center" reverseOrder={false} />
            </div>
          </Provider>
        </SessionProvider>
      </body>
    </html>
  );
}
