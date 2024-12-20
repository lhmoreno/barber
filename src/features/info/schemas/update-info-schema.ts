import { z } from '@/lib/zod'

export const updateInfoSchema = z.object({
  name: z.string().min(3).max(40).optional(),
  bio: z.string().min(5).max(250).optional(),
})

export type UpdateInfoSchema = z.infer<typeof updateInfoSchema>
