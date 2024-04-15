import type { Metadata } from "next";
import { META_DESC, META_TITLE } from "@/constants/metadata";
import { Inter } from "next/font/google";
import ToastProvider from "@/providers/ToastProvider";
import "react-toastify/dist/ReactToastify.css";
import "./global.css";
import WidthContainer from "@/components/_common/WidthContainer";
import Header from "@/app/_common/Header";
import Footer from "@/app/_common/Footer";
import { Suspense } from "react";
import { DAISYUI_DARK_THEME } from "@/constants/theme";
import ClientThemeProvider from "@/providers/ClientThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: META_TITLE,
  description: META_DESC,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // suppressHydrationWarning
    <html lang="ko" suppressHydrationWarning>
      <body className={` ${inter.className}`}>
        <ClientThemeProvider>
          <WidthContainer className="flex flex-col">
            <Header />
            <main className="flex-1">
              {children}
              <ToastProvider />
            </main>
            <Footer />
          </WidthContainer>
        </ClientThemeProvider>
      </body>
    </html>
  );
}
