import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const signInFormSchema = z.object({
  email: z.string().email(),
})

type SignInFormSchema = z.infer<typeof signInFormSchema>

export const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignInFormSchema>()

  const handleSignIn = async (data: SignInFormSchema) => {
    await new Promise((resolve) => setTimeout(resolve, 2000))
  }

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
        <form className="space-y-4" onSubmit={handleSubmit(handleSignIn)}>
          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input id="email" type="email" {...register('email')} />
          </div>
          <Button disabled={isSubmitting} className="w-full" type="submit">
            Access dashboard
          </Button>
        </form>
      </div>
    </>
  )
}
