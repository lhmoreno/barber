'use client'

import { Calendar as CalendarIcon } from 'lucide-react'
import * as React from 'react'
import { DateRange, SelectRangeEventHandler } from 'react-day-picker'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { dayjs } from '@/lib/dayjs'
import { cn } from '@/lib/utils'

export function DateRangePicker({
  className,
  range,
  onChangeRange,
}: React.HTMLAttributes<HTMLDivElement> & {
  range?: DateRange
  onChangeRange?: SelectRangeEventHandler
}) {
  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            className={cn(
              'h-9 w-full justify-start text-left font-normal md:w-[490px]',
              !range && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {range?.from ? (
              range.to ? (
                <>
                  {dayjs(range.from).format('D MMMM')} -{' '}
                  {dayjs(range.to).format('D MMMM')}
                </>
              ) : (
                dayjs(range.from).format('D MMMM')
              )
            ) : (
              <span>Selecione a data</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={range?.from}
            selected={range}
            onSelect={onChangeRange}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
