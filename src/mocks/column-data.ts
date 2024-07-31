import { ColumnType } from "@/components/dnd/column";

export const columnData: ColumnType[] = [
  {
    id: "backlog",
    title: "Ideias",
    cards: [],
    status: "backlog",
  },
  {
    id: "development",
    title: "A Fazer",
    cards: [],
    status: "development",
  },
  {
    id: "developed",
    title: "Fazendo",
    cards: [],
    status: "developed",
  },
  {
    id: "done",
    title: "Feito",
    cards: [],
    status: "done",
  },
];
