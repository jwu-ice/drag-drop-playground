"use client";

import { cn } from "@/utils";
import { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ReactNode } from "react";

type Props = {
  id: UniqueIdentifier;
  columnName: string | undefined;
  columns?: number;
  children?: ReactNode;
};

const KanbanColumn = ({ id, columnName, columns, children, ...props }: Props) => {
  const {
    active,
    attributes,
    isDragging,
    listeners,
    over,
    setNodeRef,
    transition,
    transform,
    setActivatorNodeRef,
  } = useSortable({
    id,
    data: {
      type: "column",
    },
  });

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.5 : undefined,
  };

  return (
    <li
      ref={setNodeRef}
      {...attributes}
      className={cn(
        "h-full min-h-16 w-72 space-y-3 rounded-2xl border border-base-content bg-base-100/30 px-2 py-3 shadow-lg shadow-base-100",
      )}
      style={style}
      {...props}
    >
      <div ref={setActivatorNodeRef} {...listeners}>
        <h2 className="px-2">{columnName}</h2>
      </div>
      {children}
      <div className="flex gap-2 px-2">
        <button>+</button>
        Add a card
      </div>
    </li>
  );
};
export default KanbanColumn;
