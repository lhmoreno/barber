import { TRPCError } from '@trpc/server'

import { publicProcedure } from '@/lib/trpc/root'

export const getInfo = publicProcedure.query(async ({ ctx }) => {
  const prismaInfo = await ctx.prisma.barberShop.findFirst()

  if (!prismaInfo) {
    throw new TRPCError({
      message: 'Info not found.',
      code: 'NOT_FOUND',
    })
  }

  return {
    logoUrl: prismaInfo.logoUrl
      ? 'https://pub-2933225b7c3a4e9aa8d72dee07086ad0.r2.dev/' +
        prismaInfo.logoUrl
      : null,
    name: prismaInfo.name,
    bio: prismaInfo.bio,
  }
})
