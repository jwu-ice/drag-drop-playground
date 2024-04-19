import { DAISYUI_DARK_THEME, DAISYUI_LIGHT_THEME, THEME_STORAGE_KEY } from "@/constants/theme";
import { Theme } from "@/types";

import { create, StateCreator } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";

export type Persist<T> = (config: StateCreator<T>, options: PersistOptions<T>) => StateCreator<T>;

export type ThemeStore = {
  theme: Theme | string;
  setTheme: (T: Theme) => void;
};

export const useTheme = create<ThemeStore>(
  (persist as Persist<ThemeStore>)(
    (set, get) => ({
      theme: "",
      setTheme: (theme: Theme) =>
        set(() => ({
          theme,
        })),
    }),
    {
      name: THEME_STORAGE_KEY,
    },
  ),
);
