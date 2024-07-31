import { DragOverEvent } from "@dnd-kit/core";
import { ColumnType } from "../../column";
import { IHandleDragOverResources } from "../../domain/resources/IHandleDragOverResources";

export function handleDragOver(
  findColumn: (unique: string | null) => ColumnType | null,
  event: DragOverEvent,
  resources: IHandleDragOverResources
): null | undefined {
  const { active, over, delta } = event;
  const activeId = String(active.id);
  const overId = over ? String(over.id) : null;
  const activeColumn = findColumn(activeId);
  const overColumn = findColumn(overId);
  if (!activeColumn || !overColumn || activeColumn === overColumn) {
    return null;
  }
  resources.setColumns((prevState) => {
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
}
