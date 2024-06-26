"use client";

import TodoItem from "@/components/todo/TodoItem";
import DragDropProvider from "@/providers/DragDropProvider";
import { Todo } from "@/types";
import {
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
  UniqueIdentifier,
  defaultDropAnimationSideEffects,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { useId, useState } from "react";

const TodoDndArea = ({ staticData }: { staticData: Todo[] }) => {
  const [todos, setTodos] = useState(staticData);

  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

  const getIndex = (id: UniqueIdentifier) => todos.findIndex(({ id: todoId }) => todoId === id);

  const activeIndex = activeId ? getIndex(activeId) : -1;

  const handleDragStart = ({ active }: DragStartEvent) => {
    setActiveId(active.id);

    if (navigator.vibrate) {
      navigator.vibrate([200]);
    }
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (over && active.id !== over?.id) {
      setTodos((items) => {
        const overIndex = getIndex(over?.id);
        return arrayMove(items, activeIndex, overIndex);
      });
    }

    setActiveId(null);
  };

  return (
    <DragDropProvider id={useId()} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <SortableContext items={todos}>
        <ol className="flex flex-col gap-3">
          {todos.map((item, index) => {
            return <TodoItem key={item.id} id={item.id} content={item.content} />;
          })}
        </ol>
        <DragOverlay
          dropAnimation={{
            duration: 300,
            sideEffects: defaultDropAnimationSideEffects({
              className: {
                active: "opacity-50",
              },
            }),
          }}
        >
          <TodoItem
            id={todos[activeIndex]?.id}
            content={todos[activeIndex]?.content}
            classname={"shadow-lg shadow-base-100 rotate-2 cursor-grabbing"}
          />
        </DragOverlay>
      </SortableContext>
    </DragDropProvider>
  );
};

export default TodoDndArea;
