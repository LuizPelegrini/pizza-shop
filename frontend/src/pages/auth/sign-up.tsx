import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/Toast'
import { useMutation } from '@tanstack/react-query'
import { registerRestaurant } from '@/api/register-restaurant'

const signUpFormSchema = z.object({
  restaurantName: z.string(),
  managerName: z.string(),
  email: z.string().email(),
  phone: z.string(),
})

type SignUpFormSchema = z.infer<typeof signUpFormSchema>

export const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignUpFormSchema>()
  const { toast } = useToast()
  const { mutateAsync: registerRestaurantFn } = useMutation({
    mutationFn: registerRestaurant
  });

  const handleSignUp = async (data: SignUpFormSchema) => {
    try {
      await registerRestaurantFn({
        restaurantName: data.restaurantName,
        managerName: data.managerName,
        email: data.email,
        phone: data.phone
      })

      const { dismiss } = toast({
        title: 'Restaurant successfully created!',
        variant: 'success',
        action: (
          <Button
            asChild
            variant="outline"
            className="border-success-foreground bg-transparent hover:bg-transparent"
            onClick={() => dismiss()}
          >
            <Link to={`/sign-in?email=${data.email}`}>Login</Link>
          </Button>
        ),
      })
    } catch {
      toast({
        title: 'Error on creating restaurant',
        variant: 'failure',
      })
    }
  }

  return (
    <>
      <Helmet title="Sign up" />
      <div className="flex w-full max-w-[500px] flex-col gap-6 p-8">
        <Button variant="ghost" asChild className="absolute right-8 top-8">
          <Link to="/sign-in">Log in</Link>
        </Button>
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Create free account
          </h1>
          <p className="text-sm text-muted-foreground">
            Join us and start selling
          </p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit(handleSignUp)}>
          <div className="space-y-2">
            <Label htmlFor="restaurantName">Restaurant name</Label>
            <Input
              id="restaurantName"
              type="text"
              {...register('restaurantName')}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="managerName">Name</Label>
            <Input id="managerName" type="text" {...register('managerName')} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input id="email" type="email" {...register('email')} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" type="tel" {...register('phone')} />
          </div>

          <Button disabled={isSubmitting} className="w-full" type="submit">
            Create
          </Button>

          <p className="px-6 text-center text-sm leading-relaxed text-muted-foreground">
            By creating your account, you accept our
            <br />
            <a className="underline underline-offset-4" href="">
              terms and conditions
            </a>{' '}
            and{' '}
            <a className="underline underline-offset-4" href="">
              privacy terms
            </a>
          </p>
        </form>
      </div>
    </>
  )
}
