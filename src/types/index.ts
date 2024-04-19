import { DAISYUI_DARK_THEME, DAISYUI_LIGHT_THEME } from "@/constants/theme";

export type LinkType = Record<"href" | "name", string>;

export type Id = string | number;

export type Column = {
  id: Id;
  title: string;
};

export type Task = {
  id: Id;
  columnId: Id;
  content: string;
};

export type Todo = {
  id: Id;
  content: string;
};

export type Theme = typeof DAISYUI_LIGHT_THEME | typeof DAISYUI_DARK_THEME;
