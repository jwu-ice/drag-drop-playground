"use client";

import { cn } from "@/utils";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ComponentPropsWithoutRef, ReactNode, useMemo } from "react";
import { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { PlusCircle } from "lucide-react";
import KanbanTask from "@/components/kanban/KanbanTask";

type Props = {
  column: Column;
  classname?: ComponentPropsWithoutRef<"li">["className"];
  deleteColumn?: (id: Id) => void;
  updateColumn?: (id: Id, title: string) => void;
  createTask?: (id: Id) => void;
  deleteTask?: (id: Id) => void;
  updateTask?: (id: Id, content: string) => void;
  tasks: Task[];
  children?: ReactNode;
};

const KanbanColumn = ({
  column,
  classname,
  deleteColumn,
  updateColumn,
  createTask,
  deleteTask,
  updateTask,
  tasks,
  children,
  ...props
}: Props) => {
  const [isEditMode, setIsEditMode] = useState(false);

  const tasksIds = tasks.map((task) => task.id);

  const {
    attributes,
    listeners,
    isDragging,
    setNodeRef,
    transition,
    transform,
    setActivatorNodeRef,
  } = useSortable({
    id: column.id,
    data: {
      type: "column",
      column,
    },
    disabled: isEditMode,
  });

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  };

  return (
    <li
      ref={setNodeRef}
      className={cn(
        "relative flex h-full min-h-16 w-64 flex-col rounded-2xl border border-base-content bg-base-100 shadow-lg shadow-base-100 max-sm:w-44",
        isDragging && "opacity-50",
        classname,
      )}
      style={style}
      {...attributes}
      {...props}
    >
      <div className="" ref={setActivatorNodeRef} {...listeners}>
        <h2
          className="px-2 pt-2 font-medium"
          onClick={(e) => {
            setIsEditMode(true);
          }}
        >
          {isEditMode ? (
            <TextareaAutosize
              className="w-full rounded-lg bg-transparent px-2 py-1 ring-2"
              autoFocus
              spellCheck={false}
              value={column.title}
              onFocus={(e) => e.target.select()}
              onChange={(e) => {
                updateColumn && updateColumn(column.id, e.target.value);
              }}
              onBlur={() => {
                setIsEditMode(false);
              }}
              onKeyDown={(e) => {
                if (["Enter", "Escape"].some((v) => v === e.key)) {
                  setIsEditMode(false);
                }
              }}
            />
          ) : (
            <p className="break-words   px-2 py-[7px]">
              {column.title.trim() === "" ? "Enter a title" : column.title}
            </p>
          )}
        </h2>
      </div>
      <SortableContext items={tasksIds}>
        <ol className="my-2 flex w-full grow flex-col gap-2 overflow-y-auto overflow-x-hidden px-2">
          {tasks.map((task) => (
            <KanbanTask key={task.id} task={task} deleteTask={deleteTask} updateTask={updateTask} />
          ))}
        </ol>
      </SortableContext>

      <div className="cursor-pointer px-2 pb-3 font-medium ">
        <button
          className="flex w-full items-center gap-2 rounded-lg p-2 opacity-80 focus-within:ring-2 hover:bg-base-content/10"
          onClick={() => createTask && createTask(column.id)}
        >
          <PlusCircle size={18} />
          Add a card
        </button>
      </div>
    </li>
  );
};
export default KanbanColumn;
