import { protectedProcedure } from "@/lib/trpc/root";

import { updateInfoSchema } from "../schemas/update-info-schema";

export const updateInfo = protectedProcedure
  .input(updateInfoSchema)
  .mutation(async ({ ctx, input }) => {
    await ctx.prisma.barberShop.update({
      where: {
        id: ctx.session.user.id,
      },
      data: input,
    });
  });
