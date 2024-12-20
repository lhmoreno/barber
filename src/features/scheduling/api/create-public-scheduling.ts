import { TRPCError } from '@trpc/server'
import dayjs from 'dayjs'

import { publicProcedure } from '@/lib/trpc/root'

import { createPublicSchedulingSchema } from '../schemas/create-public-scheduling-schema'

export const createPublicScheduling = publicProcedure
  .input(createPublicSchedulingSchema)
  .mutation(async ({ ctx, input }) => {
    const prismaBarberShop = await ctx.prisma.barberShop.findUnique({
      where: {
        slug: input.slug,
      },
      select: {
        id: true,
      },
    })

    if (!prismaBarberShop) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Barbershop not found.',
      })
    }

    const prismaService = await ctx.prisma.service.findUnique({
      where: {
        id: input.serviceId,
      },
    })

    if (!prismaService) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Service not found.',
      })
    }

    const startTimeInMinutes =
      dayjs(input.date).hour() * 60 + dayjs(input.date).minute()

    const prismaCustomer = await ctx.prisma.customer.create({
      data: {
        name: input.name,
        whatsappNumber: input.whatsappNumber,
        barberShopId: prismaBarberShop.id,

        schedulings: {
          create: {
            date: input.date,
            startTimeInMinutes,
            endTimeInMinutes: startTimeInMinutes + prismaService.timeInMinutes,
            customerMessage: input.message,
            status: 'CONFIRMED',
            serviceId: input.serviceId,
            barberShopId: prismaBarberShop.id,
          },
        },
      },
    })

    const prismaScheduling = await ctx.prisma.scheduling.create({
      data: {
        date: input.date,
        startTimeInMinutes,
        endTimeInMinutes: startTimeInMinutes + prismaService.timeInMinutes,
        customerMessage: input.message,
        status: 'CONFIRMED',
        serviceId: input.serviceId,
        barberShopId: prismaBarberShop.id,
        customerId: prismaCustomer.id,
      },
    })

    return { id: prismaScheduling.id }
  })
