import { formatDate } from "@/lib/utils";
import { useSortable } from "@dnd-kit/sortable";
import { checkDateStatus } from "@/lib/utils-for-components";
import { CheckIcon } from "@/assets/check";
import { EyeIcon } from "lucide-react";
import { CardView } from "./card-view";
import { Button } from "../ui/button";
import { useState } from "react";

export type CardType = {
  id: string;
  title: string;
  description: string;
  responsibles: Array<{ label: string; value: string }>;
  deadline: string;
  columnId?: string;
  status?: string;
};

export function Card({
  id,
  title,
  description,
  responsibles,
  columnId,
  deadline,
}: CardType) {
  const [open, setOpen] = useState<boolean>(false);

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
      className={`relative bg-card w-full p-4 flex flex-col rounded-3xl gap-2 ${
        columnId === "done" && "border border-green-500"
      }`}
    >
      {columnId === "done" && <CheckIcon />}
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold">{title}</h4>
        <CardView
          key={id}
          id={id}
          open={open}
          title={title}
          setOpen={setOpen}
          columnId={columnId}
          deadline={deadline}
          description={description}
          responsibles={responsibles}
        >
          <Button variant="ghost" onClick={() => setOpen(true)}>
            <EyeIcon
              className="text-orange-500 opacity-10 hover:opacity-100"
              size={30}
            />
          </Button>
        </CardView>
      </div>
      <span className="leading-none font-normal text-[10px] w-fit text-[#747F93]">
        {description}
      </span>
      <div className="border-dashed border border-sky-500 p-2 w-full flex items-center justify-between rounded-3xl mb-4">
        <span className="font-normal text-[10px] text-secondary">
          Data Limite: {formatDate(deadline)}
        </span>
        {checkDateStatus(deadline, columnId)}
      </div>
      <div className="flex items-center justify-start w-full gap-2">
        {responsibles?.map((responsible) => (
          <div
            key={responsible?.value}
            className="bg-[#1E90FF] w-fit p-2 flex items-center justify-center text-white font-normal text-[10px] rounded-lg h-fit"
          >
            {responsible?.label}
          </div>
        ))}
      </div>
    </div>
  );
}
