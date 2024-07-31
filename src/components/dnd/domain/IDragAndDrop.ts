// import { DragEndEvent, DragOverEvent } from "@dnd-kit/core"
// import { ColumnType } from "../column"

import { CardType } from "../card";
import { ColumnType } from "../column";
import { IChangeTaskResources } from "./resources/IChangeTaskResources";

export interface IDragAndDrop {
  changeTask: (
    newTask: CardType | undefined,
    getColumns: () => Promise<ColumnType[]>,
    resources: IChangeTaskResources
  ) => Promise<void>;
  // findColumn: (unique: string | null) => ColumnType | null
  // handleDragOver: (event: DragOverEvent) => null | undefined
  // handleDragEnd: (event: DragEndEvent) => null | undefined
}
