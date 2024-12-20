import { TRPCError } from '@trpc/server'
import sharp from 'sharp'
import { zfd } from 'zod-form-data'

import { deleteUpload, upload } from '@/lib/storage'
import { protectedProcedure } from '@/lib/trpc/root'

const MAX_SIZE = 1048576 // 1 MB em bytes
const ALLOWED_TYPES = ['image/jpeg', 'image/png']

export const uploadImage = protectedProcedure
  .input(
    zfd.formData({
      image: zfd.file(),
    })
  )
  .mutation(async ({ ctx, input }) => {
    const prismaInfo = await ctx.prisma.barberShop.findFirst()

    if (!prismaInfo) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'User not found.',
      })
    }

    if (!ALLOWED_TYPES.includes(input.image.type)) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Unsupported file type. Allowed: JPG or PNG.',
      })
    }

    if (input.image.size > MAX_SIZE) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'The file must be a maximum of 1MB.',
      })
    }

    const arrayBuffer = await input.image.arrayBuffer()
    const buffer = new Uint8Array(arrayBuffer)

    const image = sharp(buffer)
    const metadata = await image.metadata()

    if (!metadata.width || !metadata.height) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Unable to read image metadata.',
      })
    }

    if (metadata.width > 1024 || metadata.height > 1024) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'The image must be a maximum of 1024x1024 pixels.',
      })
    }

    const { url } = await upload({
      fileName: input.image.name,
      fileType: input.image.type,
      body: buffer,
    })

    await ctx.prisma.barberShop.update({
      where: {
        id: ctx.session.user.id,
      },
      data: {
        logoUrl: url,
      },
    })

    if (prismaInfo.logoUrl) {
      await deleteUpload({ url: prismaInfo.logoUrl })
    }

    return {
      url: 'https://pub-2933225b7c3a4e9aa8d72dee07086ad0.r2.dev/' + url,
    }
  })

export const removeImage = protectedProcedure.mutation(async ({ ctx }) => {
  const prismaInfo = await ctx.prisma.barberShop.findFirst()

  if (!prismaInfo) {
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: 'User not found.',
    })
  }

  await ctx.prisma.barberShop.update({
    where: {
      id: ctx.session.user.id,
    },
    data: {
      logoUrl: null,
    },
  })

  if (prismaInfo.logoUrl) {
    await deleteUpload({ url: prismaInfo.logoUrl })
  }
})
