"use client";

import { cn } from "@/utils";
import { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { TrashIcon } from "lucide-react";
import { ComponentPropsWithoutRef, ElementType, memo, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

type Props<T extends ElementType> = {
  // id: UniqueIdentifier;
  // content: string;
  task: Task;
  deleteTask?: (id: Id) => void;
  updateTask?: (id: Id, content: string) => void;
  classname?: ComponentPropsWithoutRef<T>["className"];
  index?: number;
};

const KanbanTask = <T extends ElementType>({
  task,
  deleteTask,
  updateTask,
  classname,
}: Props<T>) => {
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: task.id,
    data: {
      type: "task",
    },
    disabled: isEditMode,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const toggleEditMode = () => {
    setIsEditMode((prev) => !prev);
    setIsMouseOver(false);
  };

  // 수정할 때 textarea 컴포넌트
  if (isEditMode) {
    return (
      <div
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        style={style}
        className={cn(
          "flex cursor-grab items-center justify-between gap-4 rounded-lg  bg-base-content/80 p-3 text-left shadow-2xl hover:ring-2 hover:ring-inset hover:ring-base-content/50",
          [isEditMode && "ring-2 ring-inset ring-blue-400"],
        )}
      >
        <TextareaAutosize
          className=" h-[90%] w-full resize-none overflow-y-hidden  bg-transparent py-2 leading-6 focus:outline-none"
          value={task.content}
          autoFocus
          spellCheck={false}
          placeholder="Write a task"
          onFocus={(e) => e.target.select()}
          onBlur={toggleEditMode}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) toggleEditMode();
            if (e.key === "Escape") setIsEditMode(false);
          }}
          onChange={(e) => updateTask && updateTask(task.id, e.target.value)}
        />
      </div>
    );
  }

  return (
    <li
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={cn(
        "flex h-full cursor-grab items-center justify-between gap-4  rounded-lg bg-base-content p-3 text-base-100 shadow-2xl focus-within:ring-2 focus-within:ring-inset hover:ring-2 hover:ring-inset hover:ring-base-content/50",
        [isDragging && "opacity-50"],
        classname,
      )}
      style={style}
      onClick={toggleEditMode}
      onMouseEnter={() => classname || setIsMouseOver(true)}
      onMouseLeave={() => setIsMouseOver(false)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggleEditMode();
        }
      }}
    >
      <p className="size-full break-words py-2">{task.content}</p>
      {isMouseOver && (
        <button
          className="absolute right-5 rounded-lg stroke-base-content/60 p-1 opacity-60  hover:opacity-10 "
          onClick={() => {
            deleteTask && deleteTask(task.id);
          }}
        >
          <TrashIcon size={18} />
        </button>
      )}
    </li>
  );
};
export default KanbanTask;
