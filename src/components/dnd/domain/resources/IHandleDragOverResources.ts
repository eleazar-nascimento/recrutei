import { ColumnType } from "../../column";

export interface IHandleDragOverResources {
  setColumns: React.Dispatch<React.SetStateAction<ColumnType[]>>;
}
