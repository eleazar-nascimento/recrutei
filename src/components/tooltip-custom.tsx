import { ReactNode } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TooltipCustomProps {
  children: ReactNode;
}

export function TooltipCustom({ children }: TooltipCustomProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent>
          <p>Visulizar</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
