import { IDragAndDrop } from "../../domain/IDragAndDrop";

import { changeTask } from "./changeTask";
import { findColumn } from "./findColumn";
import { handleDragEnd } from "./handleDragEnd";
import { handleDragOver } from "./handleDragOver";

export class DragAndDrop implements IDragAndDrop {
  changeTask = changeTask;
  findColumn = findColumn;
  handleDragOver = handleDragOver;
  handleDragEnd = handleDragEnd;
}
