import { Dispatch, ReactNode, SetStateAction } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { CardType } from "./card";
import { formatDate } from "@/lib/utils";
import { checkDateStatus } from "@/lib/utils-for-components";

interface CardViewProps extends CardType {
  children: ReactNode;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export function CardView({
  children,
  open,
  setOpen,
  responsibles,
  description,
  title,
  deadline,
  columnId,
}: CardViewProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="bg-card font-roboto">
        <div className="flex items-center justify-between">
          <DialogTitle>{title}</DialogTitle>
          <div className="flex items-center gap-3">
            <div className="font-semibold text-[10px] text-secondary">
              {checkDateStatus(deadline, columnId)}
            </div>
            <div className="border-dashed border border-zinc-800 p-2 w-[41px] flex items-center justify-between rounded-xl text-[10px]">
              {formatDate(deadline)}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-start font-normal gap-1 text-[10px] text-[#747F93]">
          <p>Responsáveis: </p>
          {responsibles?.map((responsible) => (
            <div
              key={responsible.value}
              className="w-fit flex items-center justify-center"
            >
              {responsible?.label}.{" "}
            </div>
          ))}
        </div>
        <div className="bg-[#F1F3F6] text-[#747F93] px-2 py-4 font-normal text-[10px] rounded-xl">
          {description}
        </div>
      </DialogContent>
    </Dialog>
  );
}
