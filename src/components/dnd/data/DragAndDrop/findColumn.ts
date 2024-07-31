import { ColumnType } from "../../column";

export function findColumn(
  columns: ColumnType[],
  unique: string | null
): ColumnType | null {
  if (!unique) {
    return null;
  }

  if (columns.some((c) => c.id === unique)) {
    return columns.find((c) => c.id === unique) ?? null;
  }

  const id = String(unique);

  const itemWithColumnId = columns.flatMap((c) => {
    const columnId = c.id;
    return c.cards.map((i) => ({ itemId: i?.id, columnId: columnId }));
  });

  const columnId = itemWithColumnId.find((i) => i.itemId === id)?.columnId;

  return columns.find((c) => c.id === columnId) ?? null;
}
