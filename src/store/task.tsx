import { create } from "zustand";
import { CardType } from "@/components/dnd/card";
import { ColumnType } from "@/components/dnd/column";
import { getTasks } from "@/services/tasks";

interface StoreTasksProps {
  columns: ColumnType[];
  newTask: CardType | undefined;

  updateNewTask: (newTask: CardType | undefined) => void;
  updateColumns: (columns: ColumnType[]) => void;
  addTask: (newCard: CardType) => Promise<void>;
  getColumns: () => Promise<ColumnType[]>;

  loading: boolean;
  updateLoading: (loading: boolean) => void;
}

export const useStoreTasks = create<StoreTasksProps>((set, get) => ({
  columns: [],
  newTask: undefined,
  updateColumns: async (columns) => {
    set({ columns });
  },
  updateNewTask: (newTask) => set(() => ({ newTask })),
  getColumns: async () => {
    const dataColumns = await getTasks();

    set({ columns: dataColumns, loading: false, newTask: undefined });
    return dataColumns;
  },

  addTask: async (newCard) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        get().updateNewTask(newCard);
        resolve();
      }, 2000);
    });
  },

  loading: true,
  updateLoading: (loading: boolean) => set(() => ({ loading })),
}));
