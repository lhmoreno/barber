import { z } from '@/lib/zod'
import { phoneNumberSchema } from '@/schemas/phone-number-schema'

export const createPublicSchedulingSchema = z.object({
  slug: z.string(),
  serviceId: z.string().cuid(),
  date: z.string().datetime(),

  name: z.string().min(3).max(40),
  whatsappNumber: phoneNumberSchema,
  message: z.string().min(5).max(100),
})

export type CreatePublicSchedulingSchema = z.infer<
  typeof createPublicSchedulingSchema
>
