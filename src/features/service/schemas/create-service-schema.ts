import { z } from "@/lib/zod";

export const createServiceSchema = z.object({
  name: z.string().min(3).max(40),
  timeInMinutes: z.number().min(5).multipleOf(5).positive(),
});

export type CreateServiceSchema = z.infer<typeof createServiceSchema>;
