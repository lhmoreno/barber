import { publicProcedure } from '@/lib/trpc/root'

export const getPublicServices = publicProcedure.query(async ({ ctx }) => {
  const prismaServices = await ctx.prisma.service.findMany()

  return {
    services: prismaServices.map((service) => ({
      id: service.id,
      name: service.name,
      timeInMinutes: service.timeInMinutes,
    })),
  }
})
