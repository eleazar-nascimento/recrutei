import { IDragAndDrop } from "../../domain/IDragAndDrop";

import { changeTask } from "./changeTask";
import { findColumn } from "./findColumn";

export class DragAndDrop implements IDragAndDrop {
  changeTask = changeTask;
  findColumn = findColumn;
}
