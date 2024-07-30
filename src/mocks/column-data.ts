import { ColumnType } from "@/components/dnd/column";

export const columnData: ColumnType[] = [
  {
    id: "1",
    title: "Ideias",
    cards: [
      {
        id: "Card1",
        title: "Card1",
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
      },
      {
        id: "Card2",
        title: "Card2",
        description:
          "Criar um protótipo funcional e detalhado da nova funcionalidade inovadora do produto para uma apresentação impactante...",
        responsibles: [
          {
            label: "Larry",
            value: "3",
          },
        ],
      },
    ],
  },
  {
    id: "2",
    title: "A Fazer",
    cards: [
      {
        id: "Card3",
        title: "Card3",
        description:
          "Criar um protótipo funcional e detalhado da nova funcionalidade inovadora do produto para uma apresentação impactante...",
        responsibles: [
          {
            label: "Larry",
            value: "3",
          },
        ],
      },
      {
        id: "Card4",
        title: "Card4",
        description:
          "Criar um protótipo funcional e detalhado da nova funcionalidade inovadora do produto para uma apresentação impactante...",
        responsibles: [
          {
            label: "Larry",
            value: "3",
          },
        ],
      },
    ],
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
