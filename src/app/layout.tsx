import type { Metadata } from "next";
import { META_DESC, META_TITLE } from "@/constants/metadata";
import { Inter } from "next/font/google";
import ToastProvider from "@/providers/ToastProvider";
import "react-toastify/dist/ReactToastify.css";
import "./global.css";
import WidthContainer from "@/components/_common/WidthContainer";
import Header from "@/app/_common/Header";
import Footer from "@/app/_common/Footer";
import Script from "next/script";
import { DAISYUI_DARK_THEME, DAISYUI_LIGHT_THEME, THEME_STORAGE_KEY } from "@/constants/theme";
import { ThemeProvider } from "next-themes";

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
    <html lang="ko" className="background-transition" suppressHydrationWarning>
      <body className={` ${inter.className}`}>
        <ThemeProvider storageKey={THEME_STORAGE_KEY} attribute="data-theme">
          <WidthContainer className="flex flex-col">
            <Header />
            <main className="flex-1">
              {children}
              <ToastProvider />
            </main>
            <Footer />
          </WidthContainer>
        </ThemeProvider>
      </body>
    </html>
  );
}
