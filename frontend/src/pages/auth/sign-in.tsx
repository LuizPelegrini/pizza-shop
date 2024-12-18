import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/Toast'
import { useMutation } from '@tanstack/react-query'
import { signIn } from '@/api/sign-in'

const signInFormSchema = z.object({
  email: z.string().email(),
})

type SignInFormSchema = z.infer<typeof signInFormSchema>

export const SignIn = () => {
  const [searchParams] = useSearchParams();
  const {
    register,
    handleSubmit,
    formState: { 
      isSubmitting,
    },
  } = useForm<SignInFormSchema>({
    defaultValues: {
      email: searchParams.get('email') ?? ''
    }
  })
  const { toast } = useToast()
  const { mutateAsync: authenticate } = useMutation({
    mutationFn: signIn
  });

  const handleSignIn = async (data: SignInFormSchema) => {
    try {
      await authenticate({ email: data.email })
      toast({
        title: 'Authentication link sent to your email',
        variant: 'success',
      })
    } catch {
      const { dismiss } = toast({
        title: 'Invalid credentials',
        variant: 'failure',
        action: (
          <Button
            size="sm"
            variant="failure"
            onClick={() => {
              dismiss()
              handleSignIn(data)
            }}
          >
            Resend
          </Button>
        ),
      })
    }
  }

  return (
    <>
      <Helmet title="Sign in" />
      <div className="flex w-full max-w-[500px] flex-col gap-6 p-8">
        <Button variant="ghost" asChild className="absolute right-8 top-8">
          <Link to="/sign-up">Create account</Link>
        </Button>
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
            <Input id="email" type="email" data-testid="email" {...register('email')} />
          </div>
          <Button disabled={isSubmitting} className="w-full" type="submit">
            Access dashboard
          </Button>
        </form>
      </div>
    </>
  )
}
