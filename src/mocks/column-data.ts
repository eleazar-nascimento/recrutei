import { ColumnType } from "@/components/dnd/column";

export const columnData: ColumnType[] = [
  {
    id: "1",
    title: "Ideias",
    cards: [
      {
        id: "Card1",
        title: "Pesquisa de Mercado",
        description:
          "Criar um protótipo funcional e detalhado da nova funcionalidade inovadora do produto para uma apresentação impactante...",
        responsibles: [
          {
            label: "Larryson Fernandes",
            value: "3",
          },
          {
            label: "Larryson Fernandes",
            value: "2",
          },
          {
            label: "Larryson Fernandes Nealpoll",
            value: "1",
          },
        ],
        deadline: "2024-07-24",
      },
      {
        id: "Card2",
        title: "Pesquisa de Marketing",
        description:
          "Criar um protótipo funcional e detalhado da nova funcionalidade inovadora do produto para uma apresentação impactante...",
        responsibles: [
          {
            label: "Larry",
            value: "3",
          },
        ],
        deadline: "2024-07-24",
      },
    ],
  },
  {
    id: "2",
    title: "A Fazer",
    cards: [],
  },
  {
    id: "3",
    title: "Fazendo",
    cards: [],
  },
  {
    id: "4",
    title: "Feito",
    cards: [],
  },
];
