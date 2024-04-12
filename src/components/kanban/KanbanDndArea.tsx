"use client";

import KanbanColumn from "@/components/kanban/KanbanColumn";
import KanbanTask from "@/components/kanban/KanbanTask";
import DragDropContext from "@/providers/DragDropContext";
import {
  closestCenter,
  closestCorners,
  CollisionDetection,
  defaultDropAnimationSideEffects,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  getFirstCollision,
  MeasuringStrategy,
  pointerWithin,
  rectIntersection,
  UniqueIdentifier,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

const initialColumn = [
  {
    id: "1",
    title: "First",
  },
  {
    id: "2",
    title: "Second",
  },
  { id: "3", title: "Third" },
] as Column[];

const initialTask = [
  { id: "100", columnId: "1", content: "task 100" },
  { id: "200", columnId: "1", content: "task 200" },
  { id: "300", columnId: "1", content: "task 300" },
  { id: "400", columnId: "2", content: "task 400" },
  { id: "500", columnId: "2", content: "task 500" },
] as Task[];

const KanbanDndArea = () => {
  const [columns, setColumns] = useState<Column[]>(initialColumn ?? []);
  const [tasks, setTasks] = useState<Task[]>(initialTask ?? []);

  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  return (
    <div className="flex h-full flex-1 overflow-x-auto bg-transparent py-2">
      <DragDropContext
        id={useId()}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
      >
        <SortableContext items={columnsId}>
          <ol className="mb-12 flex h-full gap-4 ">
            {columns.map((col) => {
              const { id, title } = col;
              return (
                <KanbanColumn
                  key={id}
                  column={col}
                  deleteColumn={deleteColumn}
                  updateColumn={updateColumn}
                  createTask={createTask}
                  deleteTask={deleteTask}
                  updateTask={updateTask}
                  tasks={tasks.filter((task) => task.columnId === col.id)}
                />
              );
            })}
          </ol>
        </SortableContext>
        {createPortal(
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
            {activeColumn && (
              <KanbanColumn
                column={activeColumn}
                classname="opacity-90 rotate-3"
                tasks={tasks.filter((task) => task.columnId === activeColumn.id)}
              />
            )}
            {activeTask && <KanbanTask task={activeTask} classname={"opacity-90 rotate-3"} />}
          </DragOverlay>,
          document.body,
        )}
      </DragDropContext>
      <div className="mx-4 flex w-64 max-sm:w-44">
        <button className="btn btn-outline basis-40" onClick={createNewColumn}>
          + Add Column
        </button>
      </div>
    </div>
  );

  // --- 의존 함수 ---

  function createTask(columnId: Id) {
    const newTask: Task = {
      id: generateId(),
      columnId,
      content: `Task ${tasks.length + 1}`,
    };

    setTasks([...tasks, newTask]);
  }

  function deleteTask(id: Id) {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  }

  function updateTask(id: Id, content: string) {
    const newTasks = tasks.map((task) => (task.id === id ? { ...task, content } : task));
    setTasks(newTasks);
  }

  function createNewColumn() {
    const columnToAdd: Column = {
      id: generateId(),
      title: `Column ${columns.length + 1}`,
    };

    setColumns([...columns, columnToAdd]);
  }

  function deleteColumn(id: Id) {
    const filteredColumns = columns.filter((column) => column.id !== id);

    setColumns(filteredColumns);

    const newTasks = tasks.filter((task) => task.columnId !== id);
    setTasks(newTasks);
  }

  function updateColumn(id: Id, title: string) {
    const newColumns = columns.map((col) => {
      if (col.id !== id) return col;
      return {
        ...col,
        title,
      };
    });

    setColumns(newColumns);
  }

  function handleDragStart(event: DragStartEvent) {
    const { active } = event;
    setActiveId(active.id);

    if (active.data.current?.type === "column") {
      setActiveColumn(active.data.current.column);
      return;
    }

    if (active.data.current?.type === "task") {
      setActiveTask(active.data.current.task);
      return;
    }
  }

  function handleDragEnd(event: DragEndEvent) {
    setActiveColumn(null);
    setActiveTask(null);

    const { active, over } = event;
    console.log("active, over", active, over);

    if (!over) return;
    if (active.id === over.id) return;

    const isActiveColumn = active.data.current?.type === "column";
    if (!isActiveColumn) return;

    console.log("DRAG END");
    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex((col) => col.id === active.id);
      const overColumnIndex = columns.findIndex((col) => {
        if (col.id === over?.id) return true;
        // if (col.id === over.data.current?.task?.columnId) return true;
      });
      const result = arrayMove(columns, activeColumnIndex, overColumnIndex);
      return result;
    });
  }

  function handleDragOver(event: DragOverEvent) {
    console.log("DRAG OVER START");
    const { active, over } = event;
    console.log("columnsId", columnsId);

    if (!over) return;

    setActiveId(active.id);
    console.log("activeId", activeId);

    const overId = over.id;
    console.log("overId", overId);

    if (activeId === overId) {
      return;
    }

    const isActiveTask = active.data.current?.type === "task";
    const isOverTask = over.data.current?.type === "task";

    if (!isActiveTask) return;

    // 1. dropping a task over another task
    // 태스크 끼리 옮길 때
    if (isActiveTask && isOverTask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((task) => task.id === activeId);
        const overIndex = tasks.findIndex((task) => task.id === overId);

        if (!tasks[overIndex]) return tasks;

        console.log("columnId", tasks[activeIndex].columnId, tasks[overIndex].columnId);
        if (tasks[activeIndex].columnId != tasks[overIndex].columnId) {
          tasks[activeIndex].columnId = tasks[overIndex].columnId;
        }

        const resultArray = arrayMove(tasks, activeIndex, overIndex);
        console.log("-- setTasks ---", tasks, activeIndex, overIndex);
        return resultArray;
      });
    }

    // 2. dropping a task over a column
    const isOverColumn = over.data.current?.type === "column";

    // 태스크를 고르고 컬럼에다 놨을 때
    if (isOverColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((task) => task.id === activeId);

        tasks[activeIndex].columnId = overId;

        const resultArray = arrayMove(tasks, activeIndex, activeIndex);
        return resultArray;
      });
    }
  }
};

function generateId() {
  return String(Math.floor(Math.random() * 10001));
}

export default KanbanDndArea;
