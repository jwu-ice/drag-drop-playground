import { DAISYUI_LIGHT_THEME, THEME_STORAGE_KEY } from "@/constants/theme";
import useThemeStore from "@/stores/useThemeStore";
import { useEffect } from "react";

export const useTheme = () => {
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    try {
      const localTheme = JSON.parse(localStorage.getItem(THEME_STORAGE_KEY) ?? DAISYUI_LIGHT_THEME);
      if (localTheme) {
        // localStorage.setItem(THEME_STORAGE_KEY, theme);
        document.documentElement.dataset.theme = localTheme.state.theme;
      }
    } catch (err) {
      console.log("error loading the color theme");
    }
  }, [theme]);
};
