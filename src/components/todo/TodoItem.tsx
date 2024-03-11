import { Draggable, DraggableProvided } from "@hello-pangea/dnd";
import { PencilLine, Trash } from "lucide-react";
import { FC, memo } from "react";

type Props = {
  id: Todo["id"];
  content: Todo["content"];
  index: number;
  handleClickDelete: (targetId: string) => void;
};

const TodoItem: FC<Props> = ({ id, content, index, handleClickDelete }) => {
  return (
    <Draggable key={id} index={index} draggableId={id}>
      {(draggableProvided) => (
        <li
          className="mb-3 flex items-center justify-between gap-4 rounded-md bg-base-content p-4 shadow-2xl "
          {...draggableProvided.draggableProps}
          {...draggableProvided.dragHandleProps}
          ref={draggableProvided.innerRef}
        >
          <div className="flex items-center gap-4 text-base-100">
            <div className="flex items-center gap-4">{index + 1}</div>
            <p className="">{content}</p>
          </div>
          <div className="flex items-center gap-4 text-base-100/20 ">
            <button className="size-full transition-all hover:text-base-100">
              <PencilLine size={18} />
            </button>
            <button
              className="size-full transition-all hover:text-base-100"
              onClick={() => handleClickDelete(id)}
            >
              <Trash size={18} />
            </button>
          </div>
        </li>
      )}
    </Draggable>
  );
};
export default memo(
  TodoItem,
  (prevProps, nextProps) => prevProps.id === nextProps.id && prevProps.index === nextProps.index,
);
