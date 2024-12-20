'use client'

import { PencilIcon, PlusIcon, TimerIcon, TrashIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useToast } from '@/hooks/use-toast'
import { showTimeDisplay } from '@/lib/helpers/show-time-display'
import { api } from '@/lib/trpc/api-react'
import { cn } from '@/lib/utils'

import { DeleteServiceDialog } from './delete-service-dialog'
import { ServiceDialogForm } from './service-dialog-form'

export function ServicesList() {
  const { toast } = useToast()

  const utils = api.useUtils()

  const { data, isLoading } = api.service.getAll.useQuery()

  const { mutate: createServiceFn } = api.service.create.useMutation({
    onMutate(service) {
      const tempId = Math.round(Math.random() * 1000).toString()

      utils.service.getAll.setData(undefined, (cache) => {
        if (cache) {
          return {
            ...cache,
            services: [...cache.services, { ...service, id: tempId }],
          }
        }
      })

      return { tempId }
    },
    onError(_, __, ctx) {
      if (ctx) {
        utils.service.getAll.setData(undefined, (cache) => {
          if (cache) {
            return {
              ...cache,
              services: cache.services.filter(
                (service) => service.id !== ctx.tempId
              ),
            }
          }
        })
      }
    },
    onSuccess({ id }, _, ctx) {
      if (ctx) {
        utils.service.getAll.setData(undefined, (cache) => {
          if (cache) {
            return {
              ...cache,
              services: cache.services.map((s) =>
                s.id === ctx.tempId ? { ...s, id } : s
              ),
            }
          }
        })
      }

      toast({
        title: 'Adicionado',
        description: 'Serviço adicionado com sucesso',
      })
    },
  })

  const { mutate: updateServiceFn } = api.service.update.useMutation({
    onMutate(service) {
      const cache = utils.service.getAll.getData()

      if (cache) {
        utils.service.getAll.setData(undefined, {
          ...cache,
          services: cache.services.map((s) =>
            s.id === service.id ? service : s
          ),
        })
      }

      return { cache }
    },
    onError(_, __, ctx) {
      if (ctx?.cache) {
        utils.service.getAll.setData(undefined, ctx.cache)
      }
    },
    onSuccess() {
      toast({
        title: 'Atualizado',
        description: 'Serviço atualizado com sucesso',
      })
    },
  })

  const { mutate: deleteServiceFn } = api.service.delete.useMutation({
    onMutate({ id }) {
      const cache = utils.service.getAll.getData()

      if (cache) {
        utils.service.getAll.setData(undefined, {
          ...cache,
          services: cache.services.filter((service) => service.id !== id),
        })
      }

      return { cache }
    },
    onError(_, __, ctx) {
      if (ctx?.cache) {
        utils.service.getAll.setData(undefined, ctx.cache)
      }
    },
    onSuccess() {
      toast({
        title: 'Deletado',
        description: 'Serviço deletado com sucesso',
      })
    },
  })

  return (
    <div>
      <div className="flex justify-end">
        <ServiceDialogForm
          onCreateSubmit={(service) => createServiceFn(service)}
          onUpdateSubmit={(service) => updateServiceFn(service)}
        >
          <Button>
            <PlusIcon className="h-4 w-4" />
            Novo serviço
          </Button>
        </ServiceDialogForm>
      </div>

      {!isLoading && data && data.services.length > 0 && (
        <ul className="mt-8 rounded-lg border">
          {data.services.map((service, index) => (
            <li
              key={service.id}
              className={cn(
                'flex items-center justify-between gap-2 p-4',
                index !== 0 && 'border-t'
              )}
            >
              <div className="flex-1">
                <h2 className="text-lg font-bold">{service.name}</h2>
                <div className="flex flex-wrap gap-3">
                  <div className="mt-2 flex items-center gap-1 text-sm">
                    <TimerIcon className="h-3 w-3" />
                    {showTimeDisplay(service.timeInMinutes)}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <DeleteServiceDialog
                  onConfirm={() => deleteServiceFn({ id: service.id })}
                >
                  <Button variant="outline" size="icon">
                    <TrashIcon className="h-4 w-4" />
                  </Button>
                </DeleteServiceDialog>
                <ServiceDialogForm
                  service={service}
                  onCreateSubmit={(service) => createServiceFn(service)}
                  onUpdateSubmit={(service) => updateServiceFn(service)}
                >
                  <Button variant="outline" size="icon">
                    <PencilIcon className="h-4 w-4" />
                  </Button>
                </ServiceDialogForm>
              </div>
            </li>
          ))}
        </ul>
      )}

      {isLoading && (
        <div className="mt-8 rounded-lg border">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className={cn('p-3', index !== 0 && 'border-t')}>
              <Skeleton className="h-16 rounded-lg" />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
