import { z } from '@/lib/zod'

export const phoneNumberSchema = z
  .string()
  .min(12, 'Número inválido. EX: 11988887777')
  .max(13, 'Número inválido. EX: 11988887777')
