import { ReactElement } from "react";

export function checkDateStatus(
  dateString: string,
  doneTask?: string
): ReactElement {
  const inputDate = new Date(dateString);

  const currentDate = new Date();

  inputDate.setHours(0, 0, 0, 0);
  currentDate.setHours(0, 0, 0, 0);

  const differenceInMilliseconds = inputDate.getTime() - currentDate.getTime();

  const differenceInDays = Math.ceil(
    differenceInMilliseconds / (1000 * 60 * 60 * 24)
  );

  if (doneTask === "done") {
    if (differenceInDays > 0) {
      return (
        <span className="font-semibold text-[10px] text-[#63B150]">
          Dentro do Prazo
        </span>
      );
    } else if (differenceInDays < 0) {
      return (
        <span className="font-semibold text-[10px] text-[#E14942]">
          Fora do Prazo
        </span>
      );
    } else {
      return (
        <span className="font-semibold text-[10px] text-[#63B150]">
          Dentro do Prazo
        </span>
      );
    }
  }
  if (differenceInDays > 0) {
    return (
      <span className="font-semibold text-[10px] text-[#63B150]">
        Faltam {differenceInDays} dias.`
      </span>
    );
  } else if (differenceInDays < 0) {
    return (
      <span className="font-semibold text-[10px] text-[#E14942]">
        Atrasado há {Math.abs(differenceInDays)} dias.
      </span>
    );
  } else {
    return (
      <span className="font-semibold text-[10px] text-[#63B150]">
        Hoje é o dia.
      </span>
    );
  }
}
