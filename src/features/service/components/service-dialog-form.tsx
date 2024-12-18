"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  type CreateServiceSchema,
  createServiceSchema,
} from "@/features/service/schemas/create-service-schema";
import { RouterOutputs } from "@/lib/trpc/api-react";

export type Service = RouterOutputs["service"]["getAll"]["services"][0];

export function ServiceDialogForm({
  children,
  service,
  onCreateSubmit,
  onUpdateSubmit,
}: {
  children: React.ReactNode;
  service?: Service;
  onCreateSubmit: (service: Omit<Service, "id">) => void;
  onUpdateSubmit: (service: Service) => void;
}) {
  const isCreate = !service;

  const [open, setOpen] = useState(false);

  const form = useForm<CreateServiceSchema>({
    resolver: zodResolver(createServiceSchema),
    defaultValues: {
      name: service?.name ?? "",
      timeInMinutes: service?.timeInMinutes ?? 5,
    },
  });

  function close() {
    setOpen(false);
    form.reset();
  }

  function onSubmit(data: CreateServiceSchema) {
    if (isCreate) {
      onCreateSubmit(data);
    } else {
      onUpdateSubmit({ ...data, id: service.id });
    }

    close();
  }

  return (
    <Dialog open={open} onOpenChange={(v) => (v ? setOpen(true) : close())}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isCreate ? "Adicionar serviço" : "Alterar serviço"}
          </DialogTitle>
          <DialogDescription>
            Confirme os dados do serviço antes de clicar em{" "}
            {isCreate ? "Adicionar" : "Atualizar"}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-4 space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Título</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome do serviço" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="timeInMinutes"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Duração</FormLabel>
                  <FormControl>
                    <Select
                      value={String(field.value)}
                      onValueChange={(v) => field.onChange(Number(v))}
                    >
                      <SelectTrigger>
                        <SelectValue defaultValue="5" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">5 min</SelectItem>
                        <SelectItem value="10">10 min</SelectItem>
                        <SelectItem value="15">15 min</SelectItem>
                        <SelectItem value="30">30 min</SelectItem>
                        <SelectItem value="45">45 min</SelectItem>
                        <SelectItem value="60">1 h</SelectItem>
                        <SelectItem value="75">1 h 15 min</SelectItem>
                        <SelectItem value="90">1 h 30 min</SelectItem>
                        <SelectItem value="105">1 h 45 min</SelectItem>
                        <SelectItem value="120">2 h</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={close}>
                Cancelar
              </Button>
              <Button type="submit">
                {isCreate ? "Adicionar" : "Atualizar"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
