import { ColumnType } from "../../column";

export interface IChangeTaskResources {
  setColumns: React.Dispatch<React.SetStateAction<ColumnType[]>>;
}
