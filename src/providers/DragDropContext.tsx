import {
  closestCenter,
  closestCorners,
  DndContext,
  DndContextProps,
  KeyboardSensor,
  MouseSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";

// 모바일 터치 및 클릭에서 자연스러운 움직임을 위해 따로 분리 및 설정
const DragDropContext = (props: DndContextProps) => {
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 3,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 150,
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  return (
    <DndContext sensors={sensors} collisionDetection={closestCorners} {...props}>
      {props.children}
    </DndContext>
  );
};

export default DragDropContext;
