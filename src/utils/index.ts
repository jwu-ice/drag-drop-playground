import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const reorder = <TodoType>(
  items: TodoType[],
  startIndex: number,
  endIndex: number,
): TodoType[] => {
  let reorderItems = [...items];

  const [removed] = reorderItems.splice(startIndex, 1);
  reorderItems.splice(endIndex, 0, removed);

  return reorderItems;
};
