import { z } from '@/lib/zod'

export const updateBarbershopSchema = z.object({
  name: z.string().min(3).max(40).optional(),
  bio: z.string().min(5).max(250).optional().nullable(),
  whatsappNumber: z
    .string()
    .min(12, 'Número inválido. EX: 11988887777')
    .max(13, 'Número inválido. EX: 11988887777')
    .optional()
    .nullable(),
})

export type UpdateBarbershopSchema = z.infer<typeof updateBarbershopSchema>
