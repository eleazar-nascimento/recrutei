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
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { Column, ColumnType } from "./column";
import { useCallback, useEffect, useState } from "react";
import { useStoreTasks } from "@/store/task";
import { getTasks } from "@/services/tasks";

export function DndComponent() {
  const tasks = useStoreTasks((state) => state.columns);
  const [columns, setColumns] = useState<ColumnType[]>(tasks);

  const changeTasks = useCallback(async () => {
    const apiColumns = await getTasks();

    setColumns(apiColumns);
  }, []);

  useEffect(() => {
    changeTasks();
  }, [changeTasks]);

  const findColumn = (unique: string | null) => {
    if (!unique) {
      return null;
    }

    if (columns.some((c) => c.id === unique)) {
      return columns.find((c) => c.id === unique) ?? null;
    }

    const id = String(unique);

    const itemWithColumnId = columns.flatMap((c) => {
      const columnId = c.id;
      return c.cards.map((i) => ({ itemId: i?.id, columnId: columnId }));
    });

    const columnId = itemWithColumnId.find((i) => i.itemId === id)?.columnId;

    return columns.find((c) => c.id === columnId) ?? null;
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over, delta } = event;
    const activeId = String(active.id);
    const overId = over ? String(over.id) : null;
    const activeColumn = findColumn(activeId);
    const overColumn = findColumn(overId);
    if (!activeColumn || !overColumn || activeColumn === overColumn) {
      return null;
    }
    setColumns((prevState) => {
      const activeItems = activeColumn.cards;
      const overItems = overColumn.cards;
      const activeIndex = activeItems.findIndex((i) => i?.id === activeId);
      const overIndex = overItems.findIndex((i) => i?.id === overId);

      const newIndex = () => {
        const putOnBelowLastItem =
          overIndex === overItems.length - 1 && delta.y > 0;
        const modifier = putOnBelowLastItem ? 1 : 0;
        return overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
      };

      return prevState.map((c) => {
        if (c.id === activeColumn.id) {
          c.cards = activeItems.filter((i) => i?.id !== activeId);
          return c;
        } else if (c.id === overColumn.id) {
          c.cards = [
            ...overItems.slice(0, newIndex()),
            activeItems[activeIndex],
            ...overItems.slice(newIndex(), overItems.length),
          ];
          return c;
        } else {
          return c;
        }
      });
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    const activeId = String(active.id);
    const overId = over ? String(over.id) : null;
    const activeColumn = findColumn(activeId);
    const overColumn = findColumn(overId);
    if (!activeColumn || !overColumn || activeColumn !== overColumn) {
      return null;
    }
    const activeIndex = activeColumn.cards.findIndex((i) => i?.id === activeId);
    const overIndex = overColumn.cards.findIndex((i) => i?.id === overId);
    if (activeIndex !== overIndex) {
      setColumns((prevState) => {
        return prevState.map((column) => {
          if (column.id === activeColumn.id) {
            column.cards = arrayMove(overColumn.cards, activeIndex, overIndex);
            return column;
          } else {
            return column;
          }
        });
      });
    }
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
