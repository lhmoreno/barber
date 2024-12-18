import { type Metadata } from 'next'

import { ServicesList } from '@/features/service/components/services-list'

export const metadata: Metadata = {
  title: 'Serviços | AgendaChat',
}

export default async function Services() {
  return (
    <div className="w-full space-y-8">
      <div>
        <h2 className="text-2xl font-bold">Serviços</h2>
        <p className="text-muted-foreground">
          Crie serviços para que as pessoas possam fazer agendamentos.
        </p>
      </div>

      <ServicesList />
    </div>
  )
}
