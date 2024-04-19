"use client";

import { DAISYUI_DARK_THEME, DAISYUI_LIGHT_THEME } from "@/constants/theme";
import { cn } from "@/utils";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ThemeController = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const [isMount, setIsMount] = useState(false);

  console.log("theme, systemTheme, resolvedTheme", resolvedTheme);

  const handleToggleTheme = () => setTheme(resolvedTheme === "dark" ? "light" : "dark");

  useEffect(() => {
    setIsMount(true);
  }, []);

  if (!isMount) return;

  return (
    <div className="btn btn-ghost btn-sm mr-2 rounded-xl max-sm:btn-xs" onClick={handleToggleTheme}>
      <Sun size={16} className={cn(resolvedTheme === "dark" && "hidden")} />
      <Moon size={16} className={cn(resolvedTheme === "light" && "hidden")} />
    </div>
  );
};

export default ThemeController;
