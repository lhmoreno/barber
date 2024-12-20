import { protectedProcedure } from '@/lib/trpc/root'

import { createServiceSchema } from '../schemas/create-service-schema'

export const createService = protectedProcedure
  .input(createServiceSchema)
  .mutation(async ({ ctx, input }) => {
    const prismaService = await ctx.prisma.service.create({
      data: {
        name: input.name,
        timeInMinutes: input.timeInMinutes,
      },
    })

    return { id: prismaService.id }
  })
