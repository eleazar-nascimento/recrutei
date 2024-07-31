import {
  closestCorners,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverEvent,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { Column, ColumnType } from "./column";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useStoreTasks } from "@/store/task";
import { DragAndDrop } from "./data/DragAndDrop";

export function DndComponent() {
  const tasks = useStoreTasks((state) => state.columns);
  const newTask = useStoreTasks((state) => state.newTask);
  const getColumns = useStoreTasks((state) => state.getColumns);

  const [columns, setColumns] = useState<ColumnType[]>(tasks);

  const dragAndDrop = useMemo(() => new DragAndDrop(), []);

  const changeTasks = useCallback(async () => {
    dragAndDrop.changeTask(newTask, getColumns, { setColumns });
  }, [dragAndDrop, getColumns, newTask]);

  useEffect(() => {
    changeTasks();
  }, [changeTasks]);

  const findColumn = (unique: string | null) => {
    return dragAndDrop.findColumn(columns, unique);
  };

  const handleDragOver = (event: DragOverEvent) => {
    return dragAndDrop.handleDragOver(findColumn, event, { setColumns });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    return dragAndDrop.handleDragEnd(findColumn, event, { setColumns });
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
    >
      <div className="container w-full overflow-x-auto relative">
        <div className="grid grid-cols-4 gap-4 min-w-max min-h-[20rem] pb-8">
          {columns?.map((column) => (
            <Column
              key={column?.id}
              id={column?.id}
              title={column?.title}
              cards={column?.cards}
              status={column?.status}
            />
          ))}
        </div>
      </div>
    </DndContext>
  );
}
