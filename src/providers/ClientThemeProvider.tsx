"use client";

import { DAISYUI_DARK_THEME, DAISYUI_LIGHT_THEME, THEME_STORAGE_KEY } from "@/constants/theme";
import { ThemeProvider, useTheme } from "next-themes";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const ClientThemeProvider = ({ children }: Props) => {
  const { systemTheme } = useTheme();

  return (
    <ThemeProvider
      storageKey={THEME_STORAGE_KEY}
      attribute="data-theme"
      defaultTheme={systemTheme === "light" ? DAISYUI_LIGHT_THEME : DAISYUI_DARK_THEME}
    >
      {children}
    </ThemeProvider>
  );
};

export default ClientThemeProvider;
