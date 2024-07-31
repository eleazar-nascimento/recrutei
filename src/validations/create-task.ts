import { z } from "zod";

export const createTaskFormSchema = z.object({
  title: z.string().min(2, {
    message: "O Título deve ter pelo menos 2 caracteres.",
  }),
  description: z.string().min(2, {
    message: "A Descrição deve ter pelo menos 2 caracteres.",
  }),
  responsibles: z
    .array(
      z.object({
        value: z.string(),
        label: z.string(),
      })
    )
    .nonempty("Pelo menos uma opção deve ser selecionada"),
  deadline: z.string(),
});
