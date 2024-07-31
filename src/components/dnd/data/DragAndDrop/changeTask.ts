import { CardType } from "../../card";
import { ColumnType } from "../../column";
import { IChangeTaskResources } from "../../domain/resources/IChangeTaskResources";

export async function changeTask(
  newTask: CardType | undefined,
  getColumns: () => Promise<ColumnType[]>,
  resources: IChangeTaskResources
): Promise<void> {
  try {
    if (newTask) {
      resources.setColumns((prevColumns) => {
        const updatedColumns = [...prevColumns];

        updatedColumns[0] = {
          ...updatedColumns[0],
          cards: [newTask, ...updatedColumns[0].cards],
        };

        return updatedColumns;
      });
    } else {
      const dataColumns = await getColumns();

      resources.setColumns(dataColumns);
    }
  } catch (error) {
    console.error(error);
  }
}
