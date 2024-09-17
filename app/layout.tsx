"use client";

import "./globals.css";
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import { store } from "@/store/store";
import { Toaster } from "react-hot-toast";
import MainHeader from "@/components/Header/MainHeader";
import NextTopLoader from "nextjs-toploader";

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
              <NextTopLoader
                color="#2299DD"
                initialPosition={0.08}
                crawlSpeed={200}
                height={3}
                crawl={true}
                showSpinner={false}
                easing="ease"
                speed={200}
                shadow="0 0 10px #2299DD,0 0 5px #2299DD"
              />
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
