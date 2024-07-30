import { create } from "zustand";
import { CardType } from "@/components/dnd/card";
import { ColumnType } from "@/components/dnd/column";
import { columnData } from "@/mocks/column-data";

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
