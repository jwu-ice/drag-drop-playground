"use client";

import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { DragDropContext, Draggable, DragStart, Droppable, DropResult } from "@hello-pangea/dnd";
import { reorder } from "@/utils";
import TodoItem from "@/components/todo/TodoItem";

const DnD = ({ staticData }: { staticData: Todo[] }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleDragStart = () => {
    if (navigator.vibrate) {
      navigator.vibrate([100]);
    }
  };

  const handleDragEnd = (result: DropResult) => {
    if (result.combine) {
      const newTodos: Todo[] = [...todos];
      newTodos.splice(result.source.index, 1);
      setTodos(newTodos);
      return;
    }

    if (!result.destination) return;
    if (result.destination.index === result.source.index) return;

    const newTodos = reorder(todos, result.source.index, result.destination.index);
    setTodos(newTodos);
  };

  const handleClickDelete = useCallback(
    (targetId: string) => {
      const newTodos: Todo[] = [...todos].filter(({ id }) => targetId !== id);
      setTodos(newTodos);
    },
    [todos],
  );

  useEffect(() => {
    setTodos(staticData);
  }, [staticData]);

  return (
    <div>
      <DragDropContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <Droppable droppableId="droppable">
          {(droppableProvided) => (
            <ul
              className="flex flex-col "
              {...droppableProvided.droppableProps}
              ref={droppableProvided.innerRef}
            >
              {todos.map(({ id, content }, index) => (
                <TodoItem
                  key={id}
                  id={id}
                  content={content}
                  index={index}
                  handleClickDelete={handleClickDelete}
                />
              ))}
              {droppableProvided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default DnD;
