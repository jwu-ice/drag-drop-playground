import {
  DndContext,
  DndContextProps,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

const DragDropContext = (props: DndContextProps) => {
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 150,
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor),
  );

  return (
    <DndContext sensors={sensors} {...props}>
      {props.children}
    </DndContext>
  );
};

export default DragDropContext;
