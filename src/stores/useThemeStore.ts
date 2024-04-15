import { DAISYUI_DARK_THEME, DAISYUI_LIGHT_THEME, THEME_STORAGE_KEY } from "@/constants/theme";

import { create, StateCreator } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";

type Persist<T> = (config: StateCreator<T>, options: PersistOptions<T>) => StateCreator<T>;

type State = {
  theme: typeof DAISYUI_LIGHT_THEME | typeof DAISYUI_DARK_THEME;
};

type Action = {
  toggleTheme: () => void;
};

const initialState = {
  theme:
    typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches
      ? DAISYUI_DARK_THEME
      : DAISYUI_LIGHT_THEME,
};

const useThemeStore = create<State & Action>(
  (persist as Persist<State & Action>)(
    (set, get) => ({
      ...initialState,
      toggleTheme: () =>
        set(() => ({
          theme: get().theme === DAISYUI_DARK_THEME ? DAISYUI_LIGHT_THEME : DAISYUI_DARK_THEME,
        })),
    }),
    {
      name: THEME_STORAGE_KEY,
    },
  ),
);

export default useThemeStore;
