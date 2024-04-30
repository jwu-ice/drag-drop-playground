import {
  closestCenter,
  closestCorners,
  CollisionDetection,
  DndContext,
  DndContextProps,
  KeyboardSensor,
  MouseSensor,
  PointerSensor,
  pointerWithin,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";

// 모바일 터치 및 클릭에서 자연스러운 움직임을 위해 따로 분리 및 설정
const DragDropProvider = (props: DndContextProps) => {
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
    <DndContext
      sensors={sensors}
      collisionDetection={customCollisionDetectionAlgorithm as CollisionDetection}
      {...props}
    >
      {props.children}
    </DndContext>
  );
};

// Ref: https://github.com/clauderic/dnd-kit/issues/900
function customCollisionDetectionAlgorithm(args: any) {
  const closestCornersCollisions = closestCorners(args);
  const closestCenterCollisions = closestCenter(args);
  const pointerWithinCollisions = pointerWithin(args);

  if (
    closestCornersCollisions.length > 0 &&
    closestCenterCollisions.length > 0 &&
    pointerWithinCollisions.length > 0
  ) {
    return closestCornersCollisions;
  }

  return null;
}

export default DragDropProvider;
