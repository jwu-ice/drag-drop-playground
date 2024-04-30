"use client";

import StickerItem from "@/components/sticker/StickerItem";
import DragDropProvider from "@/providers/DragDropProvider";
import { useStickerStore } from "@/stores/sticker-store";
import {
  DragEndEvent,
  DragMoveEvent,
  DragOverEvent,
  DragStartEvent,
  Modifier,
  Modifiers,
  UniqueIdentifier,
} from "@dnd-kit/core";
import { createSnapModifier, restrictToParentElement } from "@dnd-kit/modifiers";
import { DragEventHandler, DragEvent, useId, useState } from "react";

export type Sticker = {
  id: UniqueIdentifier;
  content: string;
  color?: string;
  date?: Date;
  top: number;
  left: number;
  width: number;
  height: number;
};

const gridSize = 1;
const snapToGridModifier = createSnapModifier(gridSize);

const StickerArea = () => {
  const stickers = useStickerStore((s) => s.stickers);
  const setStickers = useStickerStore((s) => s.setStickers);
  const [activeSticker, setActiveSticker] = useState<Sticker | null>(null);

  return (
    <DragDropProvider
      id={useId()}
      onDragEnd={handleDragEnd}
      onDragMove={handleDragMove}
      collisionDetection={undefined}
      modifiers={[restrictToParentElement, snapToGridModifier]}
    >
      <div className="h-dvh min-h-[600px] rounded-xl border border-base-content p-5">
        <ul className="relative h-full">
          {stickers.map((item) => {
            const { id, content, top, left, width, height, color, date } = item;
            return (
              <StickerItem
                key={item.id}
                id={id}
                content={content}
                top={top}
                left={left}
                width={width}
                height={height}
                color={color}
                date={date}
                handleChangeSize={handleChangeSize}
              />
            );
          })}
        </ul>
      </div>
    </DragDropProvider>
  );

  function handleChangeSize(e: DragEvent) {
    console.log("handleChangeSize!");
    console.log(e);
  }

  function handleDragStart(e: DragStartEvent) {
    const { active } = e;
    const sticker = stickers.find((sticker) => sticker.id === active.id) ?? null;
    setActiveSticker(sticker);
  }

  function handleDragEnd(e: DragEndEvent) {
    const { active, delta } = e;

    const sticker = stickers.find((sticker) => sticker.id === active.id);

    if (!sticker) return null;

    const nextStickers = stickers.map((sticker) => {
      const { id, top, left } = sticker;
      console.log("stickerId, active.id, ", id, active.id);

      if (id !== active.id) {
        return sticker;
      }

      const nextTop = top + delta.y;
      const nextLeft = left + delta.x;
      const result = { ...sticker, top: nextTop, left: nextLeft };
      return result;
    });

    setStickers(nextStickers);
  }

  function handleDragMove(e: DragMoveEvent) {
    const { delta } = e;
  }
};
export default StickerArea;
