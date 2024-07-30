import { create } from "zustand";
import { CardType } from "@/components/dnd/card";
import { ColumnType } from "@/components/dnd/column";
import { columnData } from "@/mocks/column-data";

interface StoreTasksProps {
  columns: ColumnType[];
  addTask: (newCard: CardType) => Promise<void>;

  loading: boolean;
  updateLoading: (loading: boolean) => void;
}

export const useStoreTasks = create<StoreTasksProps>((set, get) => ({
  columns: columnData,
  addTask: async (newCard) => {
    const returnPromise = () => {
      const columns = get().columns;

      columns[0].cards.push(newCard);
    };

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(returnPromise());
      }, 2000);
    });
  },

  loading: false,
  updateLoading: (loading: boolean) => set(() => ({ loading })),
}));
