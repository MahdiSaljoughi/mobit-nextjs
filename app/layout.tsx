import { Inter } from "next/font/google";
import "./globals.css";
import MainFooter from "@/components/Footer/MainFooter";
import MainHeader from "@/components/Header/MainHeader";
import { Toaster } from "@/components/ui/sonner";
import { CartContextProvider } from "@/contexts/cart";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" dir="rtl">
      <head>
        <title>فروشگاه اینترنتی مبیت</title>
        <link rel="shortcut icon" href="icon.png" type="image/x-icon" />
      </head>
      <body className={inter.className}>
        <CartContextProvider>
          <div className="font-[iran]">
            <MainHeader />
            <main>{children}</main>
            <Toaster />
            <MainFooter />
          </div>
        </CartContextProvider>
      </body>
    </html>
  );
}
