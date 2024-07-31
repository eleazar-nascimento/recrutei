import { CardType } from "@/components/dnd/card";
import { columnData } from "@/mocks/column-data";
import axios from "axios";

interface GetTasksProps {
  id: string,
  date: string,
  title: string,
  description: string,
  status: string,
  responsible: Array<string>,
}


export async function getTasks() {
  const { data } = await axios.get(
    "https://api.npoint.io/21c80c25ed65b6f3484f"
  );

  const updatedColumns = columnData.map((column) => {
    const cardsForColumn = data.filter((card: CardType) => {
      const cardStatus = card.status === "doing" ? "development" : card.status;
      return cardStatus === column.status;
    });

    const formattedCards = cardsForColumn.map((card: GetTasksProps) => {
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
