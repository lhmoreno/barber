'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'

import { Button, buttonVariants } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { dayjs } from '@/lib/dayjs'
import { convertMinutesToTime } from '@/lib/helpers/minutes'
import { api, RouterOutputs } from '@/lib/trpc/api-react'
import { cn } from '@/lib/utils'

const dateNow = new Date().toISOString()

export function SelectDateForm({
  serviceId,
  unavailable,
}: {
  serviceId: string
  unavailable: RouterOutputs['availability']['public']['getUnavailableDays']
  isAdmin?: boolean
}) {
  const router = useRouter()
  const pathname = usePathname()

  const [date, setDate] = useState(dateNow)

  const { data, isPending } = api.availability.public.getHours.useQuery({
    serviceId,
    date,
  })

  function handleSubmit(time: number) {
    const dateTime = dayjs(date)
      .startOf('day')
      .add(time, 'minute')
      .toISOString()

    router.push(pathname + '/' + dateTime)
  }

  return (
    <div className="flex flex-1 flex-col md:flex-row">
      <div className="border-b p-1 md:border-r">
        <Calendar
          mode="single"
          selected={
            date
              ? dayjs(date).subtract(dayjs(date).utcOffset(), 'minute').toDate()
              : undefined
          }
          onSelect={(v) => v && setDate(v.toISOString())}
          disabled={[
            { before: new Date() },
            { dayOfWeek: unavailable.days },
            ...unavailable.dates.map((d) =>
              dayjs(d).subtract(dayjs(d).utcOffset(), 'minute').toDate()
            ),
          ]}
          showOutsideDays={false}
          classNames={{
            caption_label: 'text-sm font-medium capitalize md:text-base',
            nav_button: cn(
              buttonVariants({ variant: 'outline' }),
              'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 md:h-10 md:w-10'
            ),
            head_cell:
              'text-muted-foreground rounded-md w-9 font-normal text-[0.8rem] md:h-12 md:w-12 md:text-base',
            cell: 'h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20 md:h-12 md:w-12',
            day: cn(
              buttonVariants({ variant: 'ghost' }),
              'h-9 w-9 p-0 font-normal aria-selected:opacity-100 md:h-12 md:w-12'
            ),
          }}
        />
      </div>
      <div className="flex-1">
        <div className="flex gap-2 p-4">
          <h4 className="font-bold">{dayjs(date).format('ddd.')}</h4>
          <p>{dayjs(date).date()}</p>
        </div>

        <ScrollArea className="p-4 pt-0 md:h-[400px]">
          {!isPending && data && (
            <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
              {data.hours.map((minutes) => (
                <Button
                  key={minutes}
                  variant="outline"
                  onClick={() => handleSubmit(minutes)}
                >
                  {convertMinutesToTime(minutes)}
                </Button>
              ))}
            </div>
          )}
        </ScrollArea>
      </div>
    </div>
  )
}
