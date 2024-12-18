import { z } from "zod";

import { protectedProcedure } from "@/lib/trpc/root";

export const deleteService = protectedProcedure
  .input(z.object({ id: z.string().cuid() }))
  .mutation(async ({ ctx, input }) => {
    await ctx.prisma.service.delete({
      where: {
        id: input.id,
      },
    });
  });
