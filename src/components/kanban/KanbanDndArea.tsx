"use client";

import KanbanColumn from "@/components/kanban/KanbanColumn";
import KanbanItem from "@/components/kanban/KanbanItem";
import DragDropContext from "@/store/DragDropContext";
import { DragEndEvent, DragOverlay, DragStartEvent, UniqueIdentifier } from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { useId, useRef, useState } from "react";
import { createPortal } from "react-dom";

type Item = {
  id: UniqueIdentifier;
  columnName: string;
  items: UniqueIdentifier[];
};

type Props = {
  items: Item[] | null;
};

const EXAMPLE_ITEMS = [
  { id: 1001, columnName: "TODO", items: [1, 2, 3] },
  { id: 1005, columnName: "DOING", items: [4, 7, 66, 99, 15, 36, 10000, 18] },
  { id: 1009, columnName: "DONE", items: [5, 1001, 50] },
  { id: 1020, columnName: "EMPTY (to be delete) (long column name)", items: [100] },
];

// ! if column id 와 item id 가 같으면 어떻게 될까 문제 생길듯

const KanbanDndArea = ({ items: initialItems }: Props) => {
  const [items, setItems] = useState(() => initialItems ?? EXAMPLE_ITEMS);

  const [columnIds, setColumnIds] = useState(items.map((item) => item.id));

  const [columnNames, setColumnNames] = useState(items.map((item) => item.columnName));

  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

  const lastOverId = useRef<UniqueIdentifier | null>(null);

  const [clonedItems, setClonedItems] = useState<Item[] | null>(null);

  const findColumn = (id: UniqueIdentifier) => {
    const column = items.find((item) => item.id === id);
    return column;
  };

  const getIndex = (id: UniqueIdentifier) => {
    const column = findColumn(id);

    if (!column) {
      return -1;
    }

    const index = items.findIndex((item) => item.id === id);
    return index;
  };

  const handleDragStart = ({ active }: DragStartEvent) => {
    setActiveId(active.id);

    if (navigator.vibrate) {
      navigator.vibrate([200]);
    }
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (findColumn(active.id) && over?.id) {
      setColumnIds((columnIds) => {
        console.log("active,", active);
        console.log("over", over);

        const activeIndex = columnIds.indexOf(active.id);
        const overIndex = columnIds.indexOf(over.id);

        return arrayMove(columnIds, activeIndex, overIndex);
      });
    }

    setActiveId(null);
  };

  return (
    <div className="relative flex h-full flex-1 overflow-x-auto bg-transparent p-2 ">
      <DragDropContext id={useId()} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <SortableContext items={[...columnIds]}>
          <ol className="mb-12 flex h-full gap-4">
            {columnIds.map((columnId, index) => {
              return (
                <KanbanColumn key={columnId} id={columnId} columnName={items[index].columnName}>
                  <SortableContext items={items[index].items}>
                    <ol className="flex flex-col gap-2">
                      {items[index].items.map((value, index) => (
                        <KanbanItem
                          key={value}
                          id={value.toString()}
                          index={index}
                          content={value.toString()}
                          getIndex={getIndex}
                          classname={""}
                        />
                      ))}
                    </ol>
                  </SortableContext>
                </KanbanColumn>
              );
            })}
          </ol>
        </SortableContext>
        <DragOverlay>
          {activeId
            ? columnIds.includes(activeId)
              ? renderKanbanColumnDragOverlay(activeId)
              : renderKanbanItemDragOverlay(activeId)
            : null}
        </DragOverlay>
      </DragDropContext>
    </div>
  );

  function renderKanbanColumnDragOverlay(columnId: UniqueIdentifier) {
    return (
      <KanbanColumn id={columnId} columnName={findColumn(columnId)?.columnName}>
        {findColumn(columnId)?.items.map((item) => {
          return <KanbanItem key={item} id={item} content={item + ""} />;
        })}
      </KanbanColumn>
    );
  }

  function renderKanbanItemDragOverlay(id: UniqueIdentifier) {
    return <KanbanItem id={id} content={id + ""} />;
  }

  function getColor(id: UniqueIdentifier) {
    switch (id) {
      case "TODO":
        return "red";
      case "DOING":
        return "orange";
      case "DONE":
        return "green";
      default:
        return "blue";
    }
  }
};

export default KanbanDndArea;
