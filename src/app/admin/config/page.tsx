import { Metadata } from 'next'

import { UpdateInfoForm } from '@/features/info/components/update-info-form'

export const metadata: Metadata = {
  title: 'Configurações | Barber',
}

export default function Settings() {
  return (
    <div className="mx-auto w-full max-w-3xl space-y-8">
      <div>
        <h2 className="text-2xl font-bold">Suas informações públicas</h2>
        <p className="text-muted-foreground">
          Altere as informações que aparecem para seus clientes.
        </p>
      </div>

      <UpdateInfoForm />
    </div>
  )
}
