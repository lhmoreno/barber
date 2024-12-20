'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { RefreshCwIcon } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'
import { api } from '@/lib/trpc/api-react'

import {
  UpdateInfoSchema,
  updateInfoSchema,
} from '../schemas/update-info-schema'

export function UpdateInfoForm() {
  const { toast } = useToast()

  const [imageErrorMsg, setImageErrorMsg] = useState<string>()

  const { update } = useSession()

  const utils = api.useUtils()

  const form = useForm<UpdateInfoSchema>({
    resolver: zodResolver(updateInfoSchema),
  })

  const { data: info, isLoading: isInfoLoading } =
    api.info.public.get.useQuery()

  useEffect(() => {
    if (info) {
      form.reset(info)
    }
  }, [form, info])

  const { mutate: updateInfoFn, isPending: isUpdateInfoPending } =
    api.info.update.useMutation({
      onError: (error) => {
        console.error(error)

        form.reset(info)

        toast({
          title: 'Ocorreu um erro inesperado',
        })
      },
      onSuccess: async () => {
        await update()

        toast({
          title: 'Informações atualizadas',
        })
      },
    })

  const { mutate: uploadImageFn, isPending: isUploadImagePending } =
    api.info.updateLogo.useMutation({
      onError: (error) => {
        console.error(error)

        toast({
          title: 'Ocorreu um erro inesperado',
        })
      },
      onSuccess: () => {
        utils.info.public.get.refetch()

        update()

        toast({
          title: 'Imagem atualizada',
        })
      },
    })

  const { mutate: removeImageFn, isPending: isRemoveImagePending } =
    api.info.removeLogo.useMutation({
      onError: (error) => {
        console.error(error)

        toast({
          title: 'Ocorreu um erro inesperado',
        })
      },
      onSuccess: () => {
        utils.info.public.get.refetch()

        update()

        toast({
          title: 'Imagem removida',
        })
      },
    })

  function handleSubmit(data: UpdateInfoSchema) {
    if (info) {
      updateInfoFn({
        name: info.name !== data.name ? data.name : undefined,
        bio: info.bio !== data.bio ? data.bio : undefined,
      })
    }
  }

  const handleChangeImage: React.ChangeEventHandler<HTMLInputElement> = (
    ev
  ) => {
    setImageErrorMsg(undefined)

    const file = ev.target.files?.[0]

    if (!file) {
      setImageErrorMsg('Imagem inválida.')
      return
    }

    const maxSize = 1048576

    if (file.size > maxSize) {
      setImageErrorMsg('A imagem deve ter no máximo 1MB.')
      return
    }

    const image = new Image()
    const objectUrl = URL.createObjectURL(file)

    image.onload = () => {
      const { width, height } = image

      if (width > 1024 || height > 1024) {
        setImageErrorMsg('A imagem deve ter no máximo 1024x1024 pixels.')
        return
      }

      const formData = new FormData()
      formData.append('image', file)
      uploadImageFn(formData)

      URL.revokeObjectURL(objectUrl)
    }

    image.src = objectUrl
  }

  return (
    <>
      <Card>
        <CardContent className="space-y-5 pt-6">
          {info && (
            <div className="space-y-6">
              <div className="flex gap-3">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={info.logoUrl ?? undefined} />
                  <AvatarFallback>
                    {info.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <strong className="text-sm">Sua logo</strong>
                  <div className="mt-1">
                    <Input
                      id="image"
                      type="file"
                      accept="image/jpeg, image/png"
                      className="hidden"
                      onChange={handleChangeImage}
                    />
                    <Button
                      variant="outline"
                      disabled={isUploadImagePending || isRemoveImagePending}
                      asChild
                    >
                      <Label htmlFor="image" className="cursor-pointer">
                        Enviar imagem
                      </Label>
                    </Button>
                    <Button
                      variant="outline"
                      className="ml-2"
                      disabled={
                        isUploadImagePending ||
                        !info.logoUrl ||
                        isRemoveImagePending
                      }
                      onClick={() => removeImageFn()}
                    >
                      Remover
                    </Button>
                    <p className="mt-1 text-sm font-medium text-destructive">
                      {imageErrorMsg}
                    </p>
                  </div>
                </div>
              </div>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleSubmit)}
                  className="mt-4 space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Nome</FormLabel>
                        <FormControl>
                          <Input {...field} value={field.value ?? ''} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Bio</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            disabled={field.disabled}
                            placeholder="Descreva um pouco sobre você..."
                            value={field.value ?? ''}
                            onChange={(ev) =>
                              field.onChange(
                                ev.target.value?.trim() === ''
                                  ? null
                                  : ev.target.value
                              )
                            }
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button disabled={isUpdateInfoPending}>
                    {!isUpdateInfoPending ? (
                      'Salvar'
                    ) : (
                      <RefreshCwIcon className="h-4 w-4 animate-spin" />
                    )}
                  </Button>
                </form>
              </Form>
            </div>
          )}
          {isInfoLoading && (
            <div className="mt-6 space-y-10">
              <Skeleton className="h-9" />
              <Skeleton className="h-9" />
              <Skeleton className="h-9" />
              <Skeleton className="h-9" />
              <Skeleton className="h-9 w-12" />
            </div>
          )}
        </CardContent>
      </Card>
    </>
  )
}
