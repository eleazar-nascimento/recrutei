import { DragOverEvent } from "@dnd-kit/core";
import { ColumnType } from "../../column";
import { IHandleDragEndResources } from "../../domain/resources/IHandleDragEndResources";
import { arrayMove } from "@dnd-kit/sortable";

export function handleDragEnd(
  findColumn: (unique: string | null) => ColumnType | null,
  event: DragOverEvent,
  resources: IHandleDragEndResources
): null | undefined {
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
    resources.setColumns((prevState) => {
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
}
