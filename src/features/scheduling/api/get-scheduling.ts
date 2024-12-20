import { TRPCError } from '@trpc/server'
import { z } from 'zod'

import { publicProcedure } from '@/lib/trpc/root'

import { convertSchedulingStatus } from '../helpers/convert-scheduling-status'

export const getPublicScheduling = publicProcedure
  .input(z.object({ id: z.string().cuid() }))
  .query(async ({ ctx, input }) => {
    const prismaScheduling = await ctx.prisma.scheduling.findUnique({
      where: {
        id: input.id,
      },
      include: {
        service: true,
      },
    })

    if (!prismaScheduling) {
      throw new TRPCError({
        message: 'Scheduling not found.',
        code: 'NOT_FOUND',
      })
    }

    return {
      id: prismaScheduling.id,
      startDate: prismaScheduling.startDate.toISOString(),
      endDate: prismaScheduling.endDate.toISOString(),
      status: convertSchedulingStatus.toHttp(prismaScheduling.status),
      customerName: prismaScheduling.customerName,
      customerPhone: prismaScheduling.customerPhone,
      service: {
        id: prismaScheduling.service.id,
        name: prismaScheduling.service.name,
        timeInMinutes: prismaScheduling.service.timeInMinutes,
      },
    }
  })
