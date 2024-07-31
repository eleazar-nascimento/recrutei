// import { DragEndEvent, DragOverEvent } from "@dnd-kit/core"
// import { ColumnType } from "../column"

import { DragOverEvent } from "@dnd-kit/core";
import { CardType } from "../card";
import { ColumnType } from "../column";
import { IChangeTaskResources } from "./resources/IChangeTaskResources";
import { IHandleDragOverResources } from "./resources/IHandleDragOverResources";

export interface IDragAndDrop {
  changeTask: (
    newTask: CardType | undefined,
    getColumns: () => Promise<ColumnType[]>,
    resources: IChangeTaskResources
  ) => Promise<void>;

  findColumn: (
    columns: ColumnType[],
    unique: string | null
  ) => ColumnType | null;

  handleDragOver: (
    findColumn: (unique: string | null) => ColumnType | null,
    event: DragOverEvent,
    resources: IHandleDragOverResources
  ) => null | undefined;
  // handleDragEnd: (event: DragEndEvent) => null | undefined
}
