import { columnData } from "@/mocks/column-data";
import axios from "axios";

export async function getTasks() {
  const { data } = await axios.get(
    "https://api.npoint.io/21c80c25ed65b6f3484f"
  );

  const updatedColumns = columnData.map((column) => {
    const cardsForColumn = data.filter((card) => {
      const cardStatus = card.status === "doing" ? "development" : card.status;
      return cardStatus === column.status;
    });

    const formattedCards = cardsForColumn.map((card) => {
      if (card.status === "done") {
        return {
          id: card.id,
          deadline: card.date,
          title: card.title,
          description: card.description,
          status: card.status,
          responsibles: card.responsible.map((responsible: string) => ({
            label: responsible,
            value: responsible.toLowerCase(),
          })),
        };
      } else {
        return {
          id: card.id,
          deadline: card.date,
          title: card.title,
          description: card.description,
          status: card.status,
          responsibles: card.responsible.map((responsible: string) => ({
            label: responsible,
            value: responsible.toLowerCase(),
          })),
        };
      }
    });

    return {
      ...column,
      cards: [...column.cards, ...formattedCards],
    };
  });

  return updatedColumns;
}
