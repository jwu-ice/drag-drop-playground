import { Sticker } from "@/components/sticker/StickerArea";
import { Id } from "@/types";
import { cn } from "@/utils";
import { DragOverEvent, useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import {
  DragEvent,
  DragEventHandler,
  EventHandler,
  MouseEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import TextareaAutosize from "react-textarea-autosize";

type StickerItem = {
  handleChangeSize: (e: DragEvent) => void;
} & Sticker;

const StickerItem = (props: StickerItem) => {
  const { id, content, top, left, width, height, color, date, handleChangeSize } = props;

  const [isEditable, setIsEditable] = useState(false);
  const [isFocus, setIsFocus] = useState(false);

  const { attributes, isDragging, setActivatorNodeRef, listeners, setNodeRef, transform } =
    useDraggable({
      id,
    });

  const style = {
    width: width + "px",
    // height: height + "px",
    top: top + "px",
    left: left + "px",
    transform: CSS.Translate.toString(transform),
  };

  const handleFocus = () => {
    setIsFocus(true);
  };
  const handleBlur = () => {
    setIsFocus(false);
    setIsEditable(false);
  };

  console.log("isEditable", isEditable);

  return (
    <li
      ref={setNodeRef}
      {...attributes}
      className={cn(
        "absolute flex min-h-[60px] min-w-[60px] flex-col border border-base-content bg-base-100 shadow shadow-base-content",
        isFocus && "border-blue-500 shadow-blue-500 outline outline-2 outline-blue-500",
      )}
      style={style}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onClick={() => {
        isFocus && setIsEditable(true);
      }}
    >
      <div ref={setActivatorNodeRef} {...listeners} className="h-4 w-full  bg-base-content" />
      <textarea
        className="min-h-[40px] cursor-default select-none overflow-hidden text-wrap break-words bg-transparent p-2"
        defaultValue={content}
        spellCheck={false}
      />
      {isFocus && (
        <div
          className="absolute bottom-[-6px] right-[-6px] z-20 cursor-pointer rounded border-2 border-blue-500 bg-white p-1"
          onDragStart={(e) => {
            e.preventDefault();
            console.log("dragStart");
          }}
        />
      )}
    </li>
  );
};
export default StickerItem;
