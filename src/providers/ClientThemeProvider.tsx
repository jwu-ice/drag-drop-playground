"use client";

import { DAISYUI_LIGHT_THEME, THEME_STORAGE_KEY } from "@/constants/theme";
import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const ClientThemeProvider = ({ children }: Props) => {
  return (
    <ThemeProvider storageKey={THEME_STORAGE_KEY} attribute="data-theme">
      {children}
    </ThemeProvider>
  );
};

export default ClientThemeProvider;
