import { Todo } from "@/types";
import { cn } from "@/utils";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ComponentPropsWithoutRef, HTMLAttributes, PropsWithoutRef, memo } from "react";

type Props = {
  id: Todo["id"];
  content: Todo["content"];
  classname?: ComponentPropsWithoutRef<"li">["className"];
};

const TodoItem = ({ id, content, classname }: Props) => {
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

export default memo(TodoItem);
