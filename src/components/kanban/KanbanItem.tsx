"use client";

import { cn } from "@/utils";
import { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ComponentPropsWithoutRef, ElementType, memo } from "react";

type Props<T extends ElementType> = {
  id: UniqueIdentifier;
  content: string;
  classname?: ComponentPropsWithoutRef<T>["className"];
  index?: number;
  getIndex?: (id: UniqueIdentifier) => number;
};

const KanbanItem = <T extends ElementType>({
  id,
  content,
  classname,
  index,
  getIndex: getColumnIndex,
}: Props<T>) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
    transition: {
      duration: 300,
      easing: "ease",
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={cn(
        "flex cursor-grab items-center justify-between gap-4 rounded-md bg-base-content p-5 text-base-100 shadow-2xl",
        [isDragging && "z-50  opacity-50"],
        classname,
      )}
      style={style}
    >
      {content}
    </li>
  );
};
export default memo(KanbanItem);
