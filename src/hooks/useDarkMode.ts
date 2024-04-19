import { DAISYUI_DARK_THEME, DAISYUI_LIGHT_THEME } from "@/constants/theme";
import { useTheme } from "next-themes";
import { useEffect } from "react";

const useDarkMode = () => {
  const { theme, setTheme, systemTheme } = useTheme();

  const toggleTheme = () => {
    const nextTheme = theme === DAISYUI_DARK_THEME ? DAISYUI_LIGHT_THEME : DAISYUI_DARK_THEME;
    setTheme(nextTheme);
  };

  useEffect(() => {}, []);

  // First connect Check system theme
  useEffect(() => {
    if (theme === "system" && systemTheme) {
      const THEME = { light: DAISYUI_LIGHT_THEME, dark: DAISYUI_DARK_THEME };
      setTheme(THEME[systemTheme]);
    }
  }, [setTheme, systemTheme, theme]);

  // If change system theme
  useEffect(() => {
    const handleChangeTheme = (e: MediaQueryListEvent) => {
      e.matches ? setTheme(DAISYUI_DARK_THEME) : setTheme(DAISYUI_LIGHT_THEME);
    };

    matchMedia("(prefers-color-scheme: dark)").addEventListener("change", handleChangeTheme);

    return () =>
      matchMedia("(prefers-color-scheme: dark)").removeEventListener("change", handleChangeTheme);
  }, [setTheme]);

  return { theme, toggleTheme };
};

export default useDarkMode;
