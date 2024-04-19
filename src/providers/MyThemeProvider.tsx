import { DAISYUI_DARK_THEME, DAISYUI_LIGHT_THEME, THEME_STORAGE_KEY } from "@/constants/theme";
import { ThemeProvider, useTheme } from "next-themes";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const MyThemeProvider = ({ children }: Props) => {
  return (
    <ThemeProvider
      storageKey={THEME_STORAGE_KEY}
      attribute="data-theme"
      enableSystem
      value={{ light: DAISYUI_LIGHT_THEME, dark: DAISYUI_DARK_THEME }}
    >
      {children}
    </ThemeProvider>
  );
};
export default MyThemeProvider;
