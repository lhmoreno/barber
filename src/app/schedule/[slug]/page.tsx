import { ArrowRightIcon, TimerIcon } from 'lucide-react'
import Link from 'next/link'

import { Badge } from '@/components/ui/badge'
import { showTimeDisplay } from '@/lib/helpers/show-time-display'
import { api } from '@/lib/trpc/api-server'

type Props = {
  params: {
    slug: string
  }
}

export default async function Services({ params: { slug } }: Props) {
  const { services } = await api.service.public.getAll()

  return (
    <div className="space-y-4">
      {services.map((service) => (
        <Link
          href={`/schedule/${slug}/${service.id}`}
          key={service.id}
          className="group flex items-center gap-2 rounded-md border p-4 transition-all hover:bg-muted"
        >
          <div className="flex-1 space-y-3">
            <h2 className="font-bold">{service.name}</h2>
            <Badge variant="outline">
              <TimerIcon className="mr-1 h-3 w-3" />
              {showTimeDisplay(service.timeInMinutes)}
            </Badge>
          </div>

          <ArrowRightIcon className="invisible h-5 w-5 text-muted-foreground group-hover:visible" />
        </Link>
      ))}
    </div>
  )
}
