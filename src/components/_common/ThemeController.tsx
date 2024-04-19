"use client";

import { DAISYUI_DARK_THEME, DAISYUI_LIGHT_THEME, THEME_STORAGE_KEY } from "@/constants/theme";
import useDarkMode from "@/hooks/useDarkMode";
import { cn } from "@/utils";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { ChangeEvent, useCallback, useEffect, useLayoutEffect, useState } from "react";

const ThemeController = () => {
  const { theme, toggleTheme } = useDarkMode();
  const [mounted, setMounted] = useState(false);

  // useEffect only runs on the client, so now we can safely show the UI

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // const SkeletonUI = () => {
  //   return systemTheme === "dark" ? <Moon size={16} /> : <Sun size={16} />;
  // };

  return (
    <div className="btn btn-ghost btn-sm mr-2 rounded-xl max-sm:btn-xs" onClick={toggleTheme}>
      {theme === DAISYUI_DARK_THEME ? <Moon size={16} /> : <Sun size={16} />}
    </div>
  );
};

export default ThemeController;
