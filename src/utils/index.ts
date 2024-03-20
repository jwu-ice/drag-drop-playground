import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/** 플래그 구분으로 적용할 것을 뒤에다 써야 제대로 적용됨 */
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

export const delay = async (delay: number = 0) => {
  return new Promise((res) => setTimeout(res, delay));
};
