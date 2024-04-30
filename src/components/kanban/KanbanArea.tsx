"use client";

import KanbanColumn from "@/components/kanban/KanbanColumn";
import KanbanTask from "@/components/kanban/KanbanTask";
import DragDropProvider from "@/providers/DragDropProvider";
import { Column, Id, Task } from "@/types";
import {
  Active,
  ClientRect,
  closestCenter,
  closestCorners,
  Collision,
  CollisionDetection,
  defaultDropAnimationSideEffects,
  DragEndEvent,
  DragMoveEvent,
  DragOverlay,
  DragStartEvent,
  DroppableContainer,
  pointerWithin,
  UniqueIdentifier,
} from "@dnd-kit/core";
import { RectMap } from "@dnd-kit/core/dist/store";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { Coordinates } from "@dnd-kit/utilities";
import { startTransition, useEffect, useState, useTransition } from "react";
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
  { columnId: "1", id: "100", content: "task 100" },
  { columnId: "1", id: "200", content: "task 200" },
  { columnId: "1", id: "300", content: "task 300" },
  { columnId: "2", id: "400", content: "task 400" },
  { columnId: "2", id: "500", content: "task 500" },
] as Task[];

const KanbanDndArea = () => {
  const [columns, setColumns] = useState<Column[]>(initialColumn);
  const [tasks, setTasks] = useState<Task[]>(initialTask);

  const columnsId = columns.map((col) => col.id);

  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const [, startTransition] = useTransition();

  return (
    <div className="flex overflow-x-auto bg-transparent">
      {/* BUG: DragOver, 태스크의 개수가 적은(높이가 작은) 컬럼에서 큰 컬럼 이동 시 문제
               active column, over가 column이 아닌 task 찍히는 문제가 있음.  */}
      <DragDropProvider
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
      >
        <SortableContext items={columnsId}>
          <ol className="mb-12 flex h-full gap-4">
            {columns.map((col) => {
              const { id, title } = col;
              return (
                <KanbanColumn
                  key={id}
                  id={id}
                  title={title}
                  deleteColumn={deleteColumn}
                  updateColumn={updateColumn}
                  createTask={createTask}
                  deleteTask={deleteTask}
                  updateTask={updateTask}
                  tasks={tasks.filter((task) => task.columnId === id)}
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
                id={activeColumn.id}
                title={activeColumn.title}
                classname="opacity-90 rotate-3"
                tasks={tasks.filter((task) => task.columnId === activeColumn.id)}
              />
            )}
            {activeTask && <KanbanTask task={activeTask} classname={"opacity-90 rotate-3 "} />}
          </DragOverlay>,
          document.body,
        )}
      </DragDropProvider>
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
      columnId,
      id: generateId(),
      content: `task ${tasks.length + 1}`,
    };

    setTasks([...tasks, newTask]);
  }

  function deleteTask(id: Id) {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  }

  function updateTask(id: Id, content: string) {
    const newTasks = tasks.map((task) => {
      const newTask = { ...task, content };
      return task.id === id ? newTask : task;
    });
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

    if (active.data.current?.type === "column") {
      const findColumn = columns.find((column) => column.id === active.id) ?? null;
      setActiveColumn(findColumn);
      return;
    }

    if (active.data.current?.type === "task") {
      const findTask = tasks.find((task) => task.id === active.id) ?? null;
      setActiveTask(findTask);
      return;
    }
  }

  function handleDragOver(event: DragMoveEvent) {
    const { active, over, collisions } = event;
    console.log("---DRAG OVER---");

    // Handle Items Sorting
    if (
      active.data.current?.type === "task" &&
      over?.data.current?.type === "task" &&
      active &&
      over &&
      active.id !== over.id
    ) {
      const activeColumn = findColumnUsingId(active.id, "task");
      const overColumn = findColumnUsingId(over.id, "task");
      console.log("activeCoulmn, overColumn", activeColumn, overColumn);

      if (!activeColumn || !overColumn) return;

      const activeTaskIndex = tasks.findIndex((task) => task.id === active.id);
      const overTaskIndex = tasks.findIndex((task) => task.id === over.id);

      if (activeColumn.id === overColumn.id) {
        const newTasks = arrayMove(tasks, activeTaskIndex, overTaskIndex);
        setTasks(newTasks);
      } else {
        tasks[activeTaskIndex].columnId = tasks[overTaskIndex].columnId;

        const newTasks = arrayMove(tasks, activeTaskIndex, overTaskIndex);
        startTransition(() => {
          setTasks(newTasks);
        });
      }
    }

    // 태스크를 컬럼에 놨을 때
    if (
      active.data.current?.type === "task" &&
      over?.data.current?.type === "column" &&
      active &&
      over &&
      active.id !== over.id
    ) {
      const activeColumn = findColumnUsingId(active.id, "task");
      const overColumn = findColumnUsingId(over.id, "column");

      if (!activeColumn || !overColumn) return;

      const activeTaskIndex = tasks.findIndex((task) => task.columnId === activeColumn.id);

      let newTasks = [...tasks];
      newTasks[activeTaskIndex].columnId = overColumn.id;

      startTransition(() => {
        setTasks(newTasks);
      });
    }

    if (
      active.data.current?.type === "column" &&
      over?.data.current?.type === "task" &&
      active &&
      over &&
      active.id !== over.id &&
      collisions
    ) {
      const activeColumnIndex = columns.findIndex((col) => col.id === active.id);

      // const columnIdOfOverTask = tasks.find((task) => task.id === over.id)?.columnId;

      const closestValues = collisions.filter((col) => col.id !== active.id);
      console.log("collisions", closestValues);

      const overColumnId = closestValues.find((col) => {
        return active.id === col.id ? false : columnsId.includes(col.id);
      })?.id;

      if (!overColumnId || overColumnId === active.id) return;

      const overColumnIndex = columns.findIndex((col) => col.id === overColumnId);
      console.log("activeColumnIndex", activeColumnIndex);
      console.log("overColumnIndex", overColumnIndex);
      const newColumns = arrayMove(columns, activeColumnIndex, overColumnIndex);

      startTransition(() => {
        setColumns(newColumns);
      });
    }
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveColumn(null);
    setActiveTask(null);

    if (
      active.data.current?.type === "column" &&
      over?.data.current?.type === "column" &&
      active &&
      over &&
      active.id !== over.id
    ) {
      const activeColumnIndex = columns.findIndex((column) => column.id === active.id);
      const overColumnIndex = columns.findIndex((column) => column.id === over.id);

      const newColumns = arrayMove(columns, activeColumnIndex, overColumnIndex);
      setColumns(newColumns);
    }

    if (
      active.data.current?.type === "task" &&
      over?.data.current?.type === "task" &&
      active &&
      over &&
      active.id !== over.id
    ) {
      const activeColumn = findColumnUsingId(active.id, "task");
      const overColumn = findColumnUsingId(over.id, "task");

      if (!activeColumn || !overColumn) return;

      const activeColumnIndex = columns.findIndex((column) => column.id === activeColumn.id);
      const overColumnIndex = columns.findIndex((column) => column.id === overColumn.id);

      const activeTaskIndex = tasks.findIndex((task) => task.id === active.id);
      const overTaskIndex = tasks.findIndex((task) => task.id === over.id);

      if (activeColumnIndex === overColumnIndex) {
        const newTasks = arrayMove(tasks, activeTaskIndex, overTaskIndex);
        setTasks(newTasks);
      } else {
        tasks[activeTaskIndex].columnId = tasks[overTaskIndex].columnId;

        const newTasks = arrayMove(tasks, activeTaskIndex, overTaskIndex);
        setTasks(newTasks);
      }
    }

    if (
      active.data.current?.type === "task" &&
      over?.data.current?.type === "column" &&
      active &&
      over &&
      active.id !== over.id
    ) {
      const activeColumn = findColumnUsingId(active.id, "task");
      const overColumn = findColumnUsingId(over.id, "column");

      if (!activeColumn || !overColumn) return;

      const activeTaskIndex = tasks.findIndex((task) => task.id === active.id);

      const newTasks = [...tasks];
      newTasks[activeTaskIndex].columnId = over.id;
      setTasks(newTasks);
    }
  }
  function findColumnUsingId(id: UniqueIdentifier | undefined, type: "column" | "task") {
    if (type === "column") {
      return columns.find((column) => column.id === id);
    }

    if (type === "task") {
      const findColumnId = tasks.find((task) => task.id === id)?.columnId;
      return columns.find((column) => column.id === findColumnId);
    }
  }
};

function generateId() {
  return String(Math.floor(Math.random() * 10001));
}

export default KanbanDndArea;
