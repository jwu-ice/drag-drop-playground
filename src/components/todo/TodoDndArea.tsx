"use client";

import TodoItem from "@/components/todo/TodoItem";
import DragDropContext from "@/store/DragDropContext";
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
    <DragDropContext id={useId()} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <SortableContext items={todos}>
        <ul className="flex flex-col gap-3">
          {todos.map((item, index) => {
            return <TodoItem key={item.id} id={item.id} content={item.content} />;
          })}
        </ul>
        <DragOverlay
          dropAnimation={{
            duration: 100,
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
    </DragDropContext>
  );
};

export default TodoDndArea;
