import { z } from "zod"
import { Button } from "./ui/button"
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import { useForm } from "react-hook-form"
import { useQuery } from "@tanstack/react-query"
import { getManagedRestaurant } from "@/api/get-managed-restaurant"
import { zodResolver } from '@hookform/resolvers/zod'

const storeProfileSchema = z.object({
  name: z.string().min(1, { message: 'Required'}),
  description: z.string().min(1)
})

type StoreProfileSchema = z.infer<typeof storeProfileSchema>;

export const StoreProfileDialog = () => {  
  const { data: managedRestaurant } = useQuery({
    queryKey: ['get-managed-restaurant'],
    queryFn: getManagedRestaurant
  })
  
  const { handleSubmit, register } = useForm<StoreProfileSchema>({
    values: {
      name: managedRestaurant?.name || '',
      description: managedRestaurant?.description || ''
    },
    resolver: zodResolver(storeProfileSchema)
  });
  

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Store Profile</DialogTitle>
        <DialogDescription>Update store profile visible to your customers</DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit(() => {})}>
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
          <Button type="button" variant="ghost">Cancel</Button>
          <Button type="submit" variant="success">Save</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}