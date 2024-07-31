import { ReactNode, useState } from "react";
import { v4 as uuidv4 } from "uuid";
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
import { useStoreTasks } from "@/store/task";
import { createTaskFormSchema } from "@/validations/create-task";

interface CreateTaskProps {
  children: ReactNode;
}

export function CreateTask({ children }: CreateTaskProps) {
  const [open, setOpen] = useState<boolean>(false);

  const addTask = useStoreTasks((state) => state.addTask);
  const updateLoading = useStoreTasks((action) => action.updateLoading);

  const form = useForm<z.infer<typeof createTaskFormSchema>>({
    resolver: zodResolver(createTaskFormSchema),
    defaultValues: {
      title: "",
      description: "",
      deadline: "",
      responsibles: [],
    },
  });

  async function onSubmit(data: z.infer<typeof createTaskFormSchema>) {
    try {
      updateLoading(true);
      await addTask({ ...data, id: uuidv4() });
    } catch (error) {
      console.error(error);
    } finally {
      setOpen(false);
      form.reset();
      updateLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
                        { value: "1", label: "Matheus Gomes" },
                        { value: "2", label: "Pedro Paulo" },
                        { value: "3", label: "Eleazar Nascimento" },
                        { value: "4", label: "John Doe" },
                      ]}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="deadline"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-zinc-800 opacity-70">
                    Data limite
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      className="rounded-full border-2 border-slate-300"
                      placeholder="Informe a data limite"
                      {...field}
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
