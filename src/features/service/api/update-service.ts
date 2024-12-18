import { z } from "zod";

import { protectedProcedure } from "@/lib/trpc/root";

import { createServiceSchema } from "../schemas/create-service-schema";

export const updateService = protectedProcedure
  .input(createServiceSchema.extend({ id: z.string().cuid() }))
  .mutation(async ({ ctx, input }) => {
    await ctx.prisma.service.update({
      where: {
        id: input.id,
      },
      data: {
        name: input.name,
        timeInMinutes: input.timeInMinutes,
      },
    });
  });
