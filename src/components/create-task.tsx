import { ReactNode } from "react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

import { MultiSelect } from "./select-multi";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "O Título deve ter pelo menos 2 caracteres.",
  }),
  description: z.string().min(2, {
    message: "O Título deve ter pelo menos 2 caracteres.",
  }),
  responsibles: z
    .array(
      z.object({
        value: z.string(),
        label: z.string(),
      })
    )
    .nonempty("Pelo menos uma opção deve ser selecionada"),
});

interface CreateTaskProps {
  children: ReactNode;
}

export function CreateTask({ children }: CreateTaskProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      responsibles: [],
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="bg-card">
        <div className="flex flex-col gap-1">
          <DialogTitle className="text-foreground font-semibold text-lg">
            Adicionar tarefa
          </DialogTitle>
          <DialogDescription className="text-xs font-normal">
            Preencha os detalhes da nova tarefa
          </DialogDescription>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-zinc-800 opacity-70">
                    Título da tarefa
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="rounded-full border-2 border-slate-300"
                      placeholder="Informe o título"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-zinc-800 opacity-70">
                    Descrição da tarefa
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      className="rounded-3xl border-2 border-slate-300"
                      placeholder="Informe a descrição"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="responsibles"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-zinc-800 opacity-70">
                    Responsáveis
                  </FormLabel>
                  <FormControl>
                    <MultiSelect
                      onChange={field.onChange}
                      defaultValue={field.value}
                      options={[
                        { value: "option1", label: "Opção 1" },
                        { value: "option2", label: "Opção 2" },
                        { value: "option3", label: "Opção 3" },
                      ]}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full rounded-full" type="submit">
              Adicionar tarefa
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
