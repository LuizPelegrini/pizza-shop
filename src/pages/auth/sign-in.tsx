import { Helmet } from 'react-helmet-async'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export const SignIn = () => {
  return (
    <>
      <Helmet title="Sign in" />
      <div className="flex w-full max-w-[500px] flex-col gap-6 px-8">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Access Dashboard
          </h1>
          <p className="text-sm text-muted-foreground">
            Follow your orders using our partner dashboard!
          </p>
        </div>
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input id="email" type="email" />
          </div>
          <Button className="w-full" type="submit">
            Access dashboard
          </Button>
        </form>
      </div>
    </>
  )
}
