import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import { Card, CardType } from "./card";
import { useStoreTasks } from "@/store/task";
import { CardSkeleton } from "./card-skeleton";

export type ColumnType = {
  id: string;
  title: string;
  cards: CardType[];
  status: string;
};

export function Column({ id, title, cards }: ColumnType) {
  const { setNodeRef } = useDroppable({ id: id });
  const loading = useStoreTasks((state) => state.loading);

  const returnSkeleton = () => {
    return Array.from({ length: 3 }).map((_, index) => (
      <CardSkeleton key={`skeleton-${index}`} />
    ));
  };

  return (
    <SortableContext id={id} items={cards} strategy={rectSortingStrategy}>
      <div ref={setNodeRef} className="w-[310px] flex flex-col gap-3">
        <div className="flex flex-col gap-2 px-4 pb-7">
          <div className="font-semibold text-[#2E2E2E] text-lg">{title}</div>
          <div className="font-normal text-sm text-[#747F93]">
            {cards?.length} tarefa
          </div>
        </div>
        {!loading
          ? cards?.map((card) => (
              <Card
                key={card?.id}
                id={card?.id}
                columnId={id}
                description={card?.description}
                title={card?.title}
                responsibles={card?.responsibles}
                deadline={card?.deadline}
                status={card?.status}
              />
            ))
          : returnSkeleton()}
      </div>
    </SortableContext>
  );
}
