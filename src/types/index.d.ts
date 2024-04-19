import { DAISYUI_DARK_THEME, DAISYUI_LIGHT_THEME } from "@/constants/theme";

type LinkType = Record<"href" | "name", string>;

type Id = string | number;

type Column = {
  id: Id;
  title: string;
};

type Task = {
  id: Id;
  columnId: Id;
  content: string;
};

type Todo = {
  id: Id;
  content: string;
};

type Theme = typeof DAISYUI_LIGHT_THEME | typeof DAISYUI_DARK_THEME;
