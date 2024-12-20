import { protectedProcedure } from '@/lib/trpc/root'

import { createServiceSchema } from '../schemas/create-service-schema'

export const createService = protectedProcedure
  .input(createServiceSchema)
  .mutation(async ({ ctx, input }) => {
    const prismaService = await ctx.prisma.service.create({
      data: {
        name: input.name,
        description: input.description,
        timeInMinutes: input.timeInMinutes,
        barberShopId: ctx.session.user.barberShopId,
      },
    })

    return { id: prismaService.id }
  })
