import { protectedProcedure } from '@/lib/trpc/root'

import { updateBarbershopSchema } from '../schemas/update-barbershop-schema'

export const updateBarbershop = protectedProcedure
  .input(updateBarbershopSchema)
  .mutation(async ({ ctx, input }) => {
    await ctx.prisma.barberShop.update({
      where: {
        id: ctx.session.user.barberShopId,
      },
      data: input,
    })
  })
