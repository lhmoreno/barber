"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { z } from "@/lib/zod";
import { useRouter } from "next/navigation";

const infoSchema = z.object({
  name: z.string().min(3, "Menos de 3 caracteres"),
  phone: z.string(),
  message: z.string(),
});

export function ScheduleForm({
  dateTime,
  service,
}: {
  dateTime: string;
  service: { id: string; name: string; timeInMinutes: number };
}) {
  const router = useRouter();

  const isPending = false;

  const form = useForm<z.infer<typeof infoSchema>>({
    resolver: zodResolver(infoSchema),
  });

  function handleSubmit(data: z.infer<typeof infoSchema>) {
    // createSchedulingFn({
    //   organizationId,
    //   date: dateParam,
    //   startTimeInMinutes: convertToTMinutes(dateParam),
    //   endTimeInMinutes: convertToTMinutes(
    //     dayjs(dateParam).add(totalMinutes, 'minute').toDate()
    //   ),
    //   serviceId: serviceParams[0],
    //   name: data.name,
    //   whatsapp: data.whatsapp,
    //   observations: null,
    // })
    router.push("/scheduling/21");
  }

  return (
    <Form {...form}>
      <form
        className="w-full space-y-3 p-6"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Seu nome <span className="text-xs text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telefone</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Observações</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end pt-4">
          <Button type="submit" disabled={isPending}>
            Agendar
          </Button>
        </div>
      </form>
    </Form>
  );
}
