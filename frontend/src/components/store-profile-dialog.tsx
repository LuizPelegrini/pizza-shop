import { z } from "zod"
import { Button } from "./ui/button"
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import { useForm } from "react-hook-form"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { GetManagedRestaurantResponse, getManagedRestaurant } from "@/api/get-managed-restaurant"
import { zodResolver } from '@hookform/resolvers/zod'
import { updateProfile } from "@/api/update-profile"
import { useToast } from "./ui/Toast"
import { DialogClose } from "@radix-ui/react-dialog"

const storeProfileSchema = z.object({
  name: z.string().min(1, { message: 'Required'}),
  description: z.string().min(1)
})

type StoreProfileSchema = z.infer<typeof storeProfileSchema>;

export const StoreProfileDialog = () => {
  const queryClient = useQueryClient();

  const { data: managedRestaurant } = useQuery({
    queryKey: ['managed-restaurant'],
    queryFn: getManagedRestaurant,
    staleTime: Infinity
  })

  const { mutateAsync: updateProfileFn } = useMutation({
    mutationFn: updateProfile,
    onSuccess(_, { name, description }) {
      const cached = queryClient.getQueryData<GetManagedRestaurantResponse>(['managed-restaurant'])

      if(cached) {
        queryClient.setQueryData<GetManagedRestaurantResponse>(['managed-restaurant'], {
          ...cached,
          name,
          description,
        })
      }
    },
  })
  
  const { handleSubmit, register, formState: { isSubmitting } } = useForm<StoreProfileSchema>({
    values: {
      name: managedRestaurant?.name || '',
      description: managedRestaurant?.description || ''
    },
    resolver: zodResolver(storeProfileSchema)
  });

  const { toast } = useToast()

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Store Profile</DialogTitle>
        <DialogDescription>Update store profile visible to your customers</DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit(async ({ name, description }) => {
        try {
          await updateProfileFn({ name, description })
          toast({
            variant: 'success',
            title: 'Profile successfully updated',
          })
        } catch {
          toast({
            variant: 'failure',
            title: 'Profile could not be updated',
          })
        }
      })}>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="name" >Name</Label>
            <Input className="col-span-3" id="name" {...register('name')}/>
          </div>

          <div className="grid grid-cols-4 items-start gap-4">
            <Label className="text-right" htmlFor="description">Description</Label>
            <Textarea className="col-span-3" id="description" {...register('description')}/>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="ghost" disabled={isSubmitting}>Cancel</Button>
          </DialogClose>
          <Button type="submit" variant="success" disabled={isSubmitting}>Save</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}