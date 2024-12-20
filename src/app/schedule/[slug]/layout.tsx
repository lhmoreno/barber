import { notFound } from 'next/navigation'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { api } from '@/lib/trpc/api-server'

type Props = {
  params: {
    slug: string
  }
}

async function getBarbershop(slug: string) {
  return await api.barbershop.public.get({ slug })
}

export async function generateMetadata({ params }: Props) {
  const barbershop = await getBarbershop(params.slug)

  return {
    title: `${barbershop.name} | Barber`,
  }
}

export default async function ScheduleLayout({
  children,
  params,
}: {
  children: React.ReactNode
} & Props) {
  try {
    const { name, bio, logoUrl } = await getBarbershop(params.slug)

    return (
      <div className="mx-auto mt-8 w-full max-w-screen-lg space-y-8 p-4">
        <div className="flex flex-col items-center">
          <Avatar className="h-24 w-24">
            <AvatarImage src={logoUrl ?? undefined} />
            <AvatarFallback>{name.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <h2 className="mt-3 text-2xl font-bold">{name}</h2>
          <p className="text-muted-foreground">{bio}</p>
        </div>

        {children}
      </div>
    )
  } catch (err) {
    notFound()
  }
}
