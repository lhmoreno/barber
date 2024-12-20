import { TRPCError } from '@trpc/server'

import { protectedProcedure } from '@/lib/trpc/root'

interface Location {
  code: number
  state: string
  city: string
  address: string
  number: number
}

export const getBarbershop = protectedProcedure.query(async ({ ctx }) => {
  const prismaBarberShop = await ctx.prisma.barberShop.findUnique({
    where: {
      id: ctx.session.user.barberShopId,
    },
  })

  if (!prismaBarberShop) {
    throw new TRPCError({
      message: 'Barbershop not found.',
      code: 'NOT_FOUND',
    })
  }

  if (!!prismaBarberShop.deletedUserInfo) {
    throw new TRPCError({
      message: 'Barbershop deleted.',
      code: 'NOT_FOUND',
    })
  }

  const location = prismaBarberShop.locationJson as Location | null

  return {
    id: prismaBarberShop.id,
    createdAt: prismaBarberShop.createdAt,
    updatedAt: prismaBarberShop.updatedAt,
    slug: prismaBarberShop.slug,
    name: prismaBarberShop.name,
    logoUrl: prismaBarberShop.logoUrl
      ? 'https://pub-2933225b7c3a4e9aa8d72dee07086ad0.r2.dev/' +
        prismaBarberShop.logoUrl
      : null,
    bio: prismaBarberShop.bio,
    whatsappNumber: prismaBarberShop.whatsappNumber,
    location,
  }
})
