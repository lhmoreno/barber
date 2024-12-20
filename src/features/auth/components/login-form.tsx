'use client'
import { signIn } from 'next-auth/react'

import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'

export function LoginForm() {
  return (
    <div className="space-y-4">
      <Button
        className="w-full"
        variant="outline"
        onClick={() => signIn('google')}
      >
        <Icons.google className="h-4 w-4" />
        Entrar com Google
      </Button>
    </div>
  )
}
