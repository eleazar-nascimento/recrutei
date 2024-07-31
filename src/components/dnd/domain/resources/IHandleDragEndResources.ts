import { ColumnType } from "../../column";

export interface IHandleDragEndResources {
  setColumns: React.Dispatch<React.SetStateAction<ColumnType[]>>;
}
