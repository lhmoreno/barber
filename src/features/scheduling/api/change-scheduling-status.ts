import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/lib/trpc/root";

export const changeSchedulingStatus = createTRPCRouter({
  toCanceled: protectedProcedure
    .input(z.object({ id: z.string().cuid() }))
    .mutation(async ({ ctx, input }) => {
      const prismaScheduling = await ctx.prisma.scheduling.findUnique({
        where: {
          id: input.id,
        },
      });

      if (!prismaScheduling) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Scheduling not found.",
        });
      }

      if (prismaScheduling.status !== "CONFIRMED") {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Scheduling status is not confirmed.",
        });
      }

      await ctx.prisma.scheduling.update({
        where: {
          id: input.id,
        },
        data: {
          status: "CANCELED",
        },
      });
    }),
});
