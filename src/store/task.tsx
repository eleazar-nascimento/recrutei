import { create } from "zustand";
import { ColumnType } from "@/drag-container/Column";
import { columnData } from "@/mocks/columnData";
import { CardType } from "@/drag-container/Card";

interface StoreTasksProps {
  columns: ColumnType[];
  addTask: (newCard: CardType) => void;

  loading: boolean;
  updateLoading: (loading: boolean) => void;
}

export const useStoreTasks = create<StoreTasksProps>((set, get) => ({
  columns: columnData,
  addTask: (newCard) => {
    set({ loading: true });
    const columns = get().columns;

    columns[0].cards.push(newCard);
    set({ loading: false });
  },

  loading: false,
  updateLoading: (loading: boolean) => set(() => ({ loading })),
}));
