import { IDragAndDrop } from "../../domain/IDragAndDrop";

import { changeTask } from "./changeTask";

export class DragAndDrop implements IDragAndDrop {
  changeTask = changeTask;
}
