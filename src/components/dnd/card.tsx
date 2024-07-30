import { useSortable } from "@dnd-kit/sortable";

export type CardType = {
  id: string;
  title: string;
  description: string;
  responsibles: Array<{ label: string; value: string }>;
  columnId?: string;
};

export function Card({
  id,
  title,
  description,
  responsibles,
  columnId,
}: CardType) {
  const { attributes, listeners, setNodeRef, transform } = useSortable({
    id: id,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`bg-card w-full p-4 flex flex-col rounded-3xl gap-2 ${
        columnId === "4" && "border border-green-500"
      }`}
    >
      <h4 className="text-sm font-semibold">{title}</h4>
      <span className="leading-none font-normal text-[10px] w-fit text-[#747F93]">
        {description}
      </span>
      <div className="border-dashed border border-sky-500 p-2 w-full flex items-center justify-between rounded-3xl mb-4">
        <span className="font-normal text-[10px] text-secondary">
          Data Limite: 26/07
        </span>
        <span className="font-semibold text-[10px] text-[#63B150]">
          Faltam 10 dias
        </span>
      </div>
      <div className="flex items-center justify-start w-full gap-2">
        {responsibles.map((responsible) => (
          <div className="bg-[#1E90FF] w-fit p-2 flex items-center justify-center text-white font-normal text-[10px] rounded-lg h-[26px] ">
            {responsible.label}
          </div>
        ))}
      </div>
    </div>
  );
}
