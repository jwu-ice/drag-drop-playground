"use client";

import { DAISYUI_DARK_THEME, DAISYUI_LIGHT_THEME } from "@/constants/theme";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ThemeController = () => {
  const { theme, setTheme, systemTheme, resolvedTheme } = useTheme();
  const [isMount, setIsMount] = useState(false);

  console.log("theme, systemTheme, resolvedTheme", theme, systemTheme, resolvedTheme);

  const TargetIcon = () => (resolvedTheme === "dark" ? <Moon size={16} /> : <Sun size={16} />);

  useEffect(() => {
    setIsMount(true);
  }, []);

  if (!isMount) return null;

  const handleToggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <div className="btn btn-ghost btn-sm mr-2 rounded-xl max-sm:btn-xs" onClick={handleToggleTheme}>
      {isMount && resolvedTheme === "light" && <Sun size={16} />}
      {isMount && resolvedTheme === "dark" && <Moon size={16} />}
    </div>
  );
};

export default ThemeController;
