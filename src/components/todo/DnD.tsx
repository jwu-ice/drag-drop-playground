"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import { DragDropContext, Draggable, DragStart, Droppable, DropResult } from "@hello-pangea/dnd";
import { reorder } from "@/utils";
import { PencilLine, Trash } from "lucide-react";

const DnD = ({ staticData }: { staticData: Todo[] }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleDragStart = () => {
    if (navigator.vibrate) {
      navigator.vibrate(100);
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

  const handleClickDelete = (index: number) => {
    () => {
      console.log("index", index);
      const newTodos: Todo[] = [...todos];
      newTodos.splice(index, 1);
      setTodos(newTodos);
    };
  };

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
              {todos.map((todo, index) => (
                <Draggable key={todo.id} index={index} draggableId={todo.id}>
                  {(draggableProvided) => (
                    <li
                      className="mb-3 flex items-center justify-between gap-4 rounded-md bg-base-content p-4 shadow-2xl "
                      {...draggableProvided.draggableProps}
                      {...draggableProvided.dragHandleProps}
                      ref={draggableProvided.innerRef}
                    >
                      <div className="flex items-center gap-4 text-base-100">
                        <div className="flex items-center gap-4">{index + 1}</div>
                        <p className="">{todo.content}</p>
                      </div>
                      <div className="flex items-center gap-4 text-base-100/20 ">
                        <button className="size-full transition-all hover:text-base-100">
                          <PencilLine size={18} />
                        </button>
                        <button
                          className="size-full transition-all hover:text-base-100"
                          onClick={() => handleClickDelete(index)}
                        >
                          <Trash size={18} />
                        </button>
                      </div>
                    </li>
                  )}
                </Draggable>
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
