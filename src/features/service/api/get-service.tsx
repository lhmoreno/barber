import { TRPCError } from '@trpc/server'
import { z } from 'zod'

import { publicProcedure } from '@/lib/trpc/root'

export const getPublicService = publicProcedure
  .input(z.object({ id: z.string().cuid() }))
  .query(async ({ ctx, input }) => {
    const prismaService = await ctx.prisma.service.findUnique({
      where: {
        id: input.id,
      },
    })

    if (!prismaService) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Service not found.',
      })
    }

    return {
      id: prismaService.id,
      name: prismaService.name,
      timeInMinutes: prismaService.timeInMinutes,
    }
  })
