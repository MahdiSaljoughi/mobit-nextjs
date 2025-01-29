"use client";

import "./globals.css";
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import { store } from "@/src/store/store";
import { Toaster } from "react-hot-toast";
import MainHeader from "@/src/components/Header/MainHeader";
import NextTopLoader from "nextjs-toploader";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <title>فروشگاه اینترنتی مبیت</title>
        <link rel="manifest" href="manifest.json" />
        <link rel="shortcut icon" href="icon.png" type="image/x-icon" />
      </head>
      <body>
        <SessionProvider>
          <Provider store={store}>
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
            <Toaster position="top-center" reverseOrder={false} />
            <div className="font-[iran] min-h-screen">
              <MainHeader />
              {children}
            </div>
          </Provider>
        </SessionProvider>
      </body>
    </html>
  );
}
