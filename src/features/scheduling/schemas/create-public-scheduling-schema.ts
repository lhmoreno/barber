import { z } from "@/lib/zod";
import { phoneNumberSchema } from "@/schemas/phone-number-schema";

export const createPublicSchedulingSchema = z.object({
  name: z.string().min(3).max(40),
  phoneNumber: phoneNumberSchema,

  startDate: z.string().datetime(),
  serviceId: z.string().cuid(),
});

export type CreatePublicSchedulingSchema = z.infer<
  typeof createPublicSchedulingSchema
>;
