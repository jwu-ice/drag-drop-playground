import { DAISYUI_DARK_THEME, DAISYUI_LIGHT_THEME, THEME_STORAGE_KEY } from "@/constants/theme";

import { create, StateCreator } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";

export type Persist<T> = (config: StateCreator<T>, options: PersistOptions<T>) => StateCreator<T>;

export type ThemeStore = {
  theme: typeof DAISYUI_LIGHT_THEME | typeof DAISYUI_DARK_THEME;
  setTheme: () => void;
};

const useStore = create<ThemeStore>(
  (persist as Persist<ThemeStore>)(
    (set, get) => ({
      theme:
        typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches
          ? DAISYUI_DARK_THEME
          : DAISYUI_LIGHT_THEME,
      setTheme: () =>
        set((prev) => ({
          ...prev,
          theme: get().theme === DAISYUI_DARK_THEME ? DAISYUI_LIGHT_THEME : DAISYUI_DARK_THEME,
        })),
    }),
    {
      name: THEME_STORAGE_KEY,
    },
  ),
);

export const useTheme = () => useStore((state) => state.theme);
export const useSetTheme = () => useStore((state) => state.setTheme);
