'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { api, RouterOutputs } from '@/lib/trpc/api-react'
import { z } from '@/lib/zod'
import { phoneNumberSchema } from '@/schemas/phone-number-schema'

const infoSchema = z.object({
  name: z.string().min(3, 'Menos de 3 caracteres'),
  phone: phoneNumberSchema,
  message: z.string(),
})

export function ScheduleForm({
  dateTime,
  service,
}: {
  dateTime: string
  service: RouterOutputs['service']['public']['get']
}) {
  const router = useRouter()

  const { mutate: createSchedulingFn, isPending } =
    api.scheduling.public.create.useMutation({
      onError: () => {
        console.error('Não foi')
      },
      onSuccess: ({ id }) => {
        router.push(`/scheduling/${id}`)
      },
    })

  const form = useForm<z.infer<typeof infoSchema>>({
    resolver: zodResolver(infoSchema),
  })

  function handleSubmit(data: z.infer<typeof infoSchema>) {
    createSchedulingFn({
      name: data.name,
      phoneNumber: data.phone,
      serviceId: service.id,
      startDate: dateTime,
    })
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
  )
}
