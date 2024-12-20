'use client'
import { FrownIcon, HardHatIcon } from 'lucide-react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { DateRangePicker } from '@/components/ui/date-range-picker'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'
import { dayjs } from '@/lib/dayjs'
import { convertMinutesToTime } from '@/lib/helpers/minutes'
import { api } from '@/lib/trpc/api-react'
import { cn } from '@/lib/utils'

import { SchedulingStatus } from './scheduling-status'

const dateNow = new Date().toISOString()

export function SchedulingsList() {
  const { toast } = useToast()

  const searchParams = useSearchParams()
  const router = useRouter()

  const pageParam = searchParams.get('page')
  const statusParam = searchParams.get('status')
  const startParam = searchParams.get('start')
  const endParam = searchParams.get('end')

  const pageResult = z.coerce
    .number()
    .min(1)
    .default(1)
    .safeParse(pageParam ?? undefined)

  const statusResult = z
    .enum(['confirmed', 'canceled', 'all'])
    .default('all')
    .safeParse(statusParam ?? undefined)

  const startResult = z
    .string()
    .datetime()
    .default(dateNow)
    .safeParse(startParam)
  const endResult = z
    .string()
    .datetime()
    .default(dayjs(dateNow).add(30, 'day').toISOString())
    .safeParse(endParam)

  const page = pageResult.success ? pageResult.data : 1
  const statusData = statusResult.success ? statusResult.data : 'confirmed'
  const status = statusData === 'all' ? undefined : statusData
  const start = startResult.success ? startResult.data : dateNow
  const end =
    endResult.success &&
    startResult.success &&
    new Date(endResult.data) > new Date(startResult?.data)
      ? endResult.data
      : dayjs(dateNow).add(30, 'day').toISOString()

  const utils = api.useUtils()
  const { data, isLoading } = api.scheduling.getAll.useQuery({
    page,
    status,
    range: { startDate: start, endDate: end },
  })

  const isInvalidPage =
    !isLoading && data && page > data.totalPages && data.totalPages > 0

  const { mutate: changeToCanceled } =
    api.scheduling.changeStatus.toCanceled.useMutation({
      onMutate({ id }) {
        const input = {
          page,
          status,
          range: { startDate: start, endDate: end },
        }
        const cache = utils.scheduling.getAll.getData(input)

        if (cache) {
          utils.scheduling.getAll.setData(input, {
            ...cache,
            schedulings: cache.schedulings.filter((s) => s.id !== id),
          })
        }

        return { cache, input }
      },
      onError(_, __, ctx) {
        if (ctx) {
          utils.scheduling.getAll.setData(ctx.input, ctx.cache)
        }

        toast({
          title: 'Erro inesperado',
        })
      },
      onSuccess() {
        toast({
          title: 'Agendamento cancelado',
        })
      },
    })

  const createQueryString = useCallback(
    (names: string[], values: string[]) => {
      const params = new URLSearchParams(searchParams.toString())

      names.forEach((name, index) => params.set(name, values[index]))

      const p = params.get('page')

      if (p && Number(p) > 1 && !names.includes('page')) {
        params.delete('page')
      }

      return params.toString()
    },
    [searchParams]
  )

  return (
    <div className="space-y-6">
      <div>
        <div>
          <p className="text-sm font-bold">Filtros:</p>
        </div>
        <div className="mt-1 flex flex-col gap-3 md:flex-row">
          <DateRangePicker
            range={{
              from: new Date(start),
              to: end ? new Date(end) : undefined,
            }}
            onChangeRange={(range) => {
              if (range?.from && !range.to) {
                router.push(
                  '/admin/schedulings?' +
                    createQueryString(['start'], [range.from.toISOString()])
                )
              }

              if (range?.from && range.to) {
                router.push(
                  '/admin/schedulings?' +
                    createQueryString(
                      ['start', 'end'],
                      [range.from.toISOString(), range.to.toISOString()]
                    )
                )
              }
            }}
          />
          <Select
            value={status ?? 'all'}
            onValueChange={(v) =>
              router.push(
                '/admin/schedulings?' + createQueryString(['status'], [v])
              )
            }
          >
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent
              ref={(ref) => {
                if (!ref) return
                ref.ontouchstart = (e) => {
                  e.preventDefault()
                }
              }}
            >
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="confirmed">Confirmados</SelectItem>
              <SelectItem value="canceled">Cancelados</SelectItem>
            </SelectContent>
          </Select>
          {(start !== dateNow || status !== 'confirmed') && (
            <Button variant="outline" className="h-9" asChild>
              <Link href="/admin/schedulings">Limpar filtros</Link>
            </Button>
          )}
        </div>
      </div>

      <div>
        {!isLoading && data && data.schedulings.length > 0 && (
          <ul className="mt-10 rounded-lg border">
            {data.schedulings.map((scheduling, index) => {
              const isBefore =
                new Date(dateNow) > new Date(scheduling.startDate)
              const startTimeInMinutes =
                dayjs(scheduling.startDate).hour() * 60 +
                dayjs(scheduling.startDate).minute()

              const endTimeInMinutes =
                dayjs(scheduling.endDate).hour() * 60 +
                dayjs(scheduling.endDate).minute()

              return (
                <li
                  key={scheduling.id}
                  className={cn(
                    'flex flex-col gap-6 p-3 md:flex-row md:items-center',
                    index !== 0 && 'border-t'
                  )}
                >
                  <div className="flex flex-1 flex-col gap-6 md:flex-row md:items-center">
                    <div className="flex items-center justify-between md:flex-col md:items-start md:justify-start">
                      <p className="text-sm font-medium">
                        {dayjs.utc(scheduling.startDate).format('D MMMM YYYY')}
                      </p>
                      <p className="text-sm text-muted-foreground">{`${convertMinutesToTime(
                        startTimeInMinutes
                      )} - ${convertMinutesToTime(endTimeInMinutes)}`}</p>
                    </div>
                    <SchedulingStatus status={scheduling.status} />
                    <div className="flex-1">
                      <p className="font-bold">{scheduling.customer?.name}</p>
                      <div>
                        <div className="flex items-center text-muted-foreground">
                          <HardHatIcon className="mr-2 h-4 w-4" />
                          <p>{scheduling.service.name}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    {!isBefore && scheduling.status === 'confirmed' && (
                      <Button
                        variant="outline"
                        onClick={() => changeToCanceled({ id: scheduling.id })}
                      >
                        Cancelar
                      </Button>
                    )}
                  </div>
                </li>
              )
            })}
          </ul>
        )}
      </div>

      {!isLoading && data && data.schedulings.length > 0 && (
        <Pagination className="mt-4 justify-end">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href={{
                  pathname: '/admin/schedulings',
                  query: {
                    page: page - 1,
                    start,
                    status,
                  },
                }}
                aria-disabled={page === 1}
                className={
                  page === 1 ? 'pointer-events-none opacity-50' : undefined
                }
              />
            </PaginationItem>
            {Array.from({
              length: data.totalPages >= 3 ? 3 : data.totalPages,
            }).map((_, index) => {
              let pageNumber = page >= 3 ? index + page - 1 : index + 1

              if (page >= 3 && page === data.totalPages) {
                pageNumber = index + page - 2
              }

              return (
                <PaginationItem key={pageNumber}>
                  <PaginationLink
                    href={{
                      pathname: '/admin/schedulings',
                      query: {
                        page: pageNumber,
                        start,
                        status,
                      },
                    }}
                    isActive={page === pageNumber}
                  >
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              )
            })}
            <PaginationItem>
              {data.totalPages > page + 1 && <PaginationEllipsis />}
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                href={{
                  pathname: '/admin/schedulings',
                  query: {
                    page: page + 1,
                    start,
                    status,
                  },
                }}
                aria-disabled={data.totalPages === page}
                className={
                  data.totalPages === page
                    ? 'pointer-events-none opacity-50'
                    : undefined
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}

      {isInvalidPage && (
        <div className="mt-16 flex justify-center">
          <div className="text-muted-foreground">
            <FrownIcon className="mx-auto h-12 w-12 opacity-80" />
            <p>Desculpe, essa página não existe</p>
            <Button asChild>
              <Link className="mt-4 w-full" href="/admin/schedulings">
                Ir para a página 1
              </Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
