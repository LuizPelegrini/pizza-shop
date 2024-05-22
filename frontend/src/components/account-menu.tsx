import { Building, ChevronDown, LogOut } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useQuery } from '@tanstack/react-query'
import { getProfile } from '@/api/get-profile'
import { getManagedRestaurant } from '@/api/get-managed-restaurant'
import { Skeleton } from './ui/skeleton'
import { Dialog, DialogTrigger } from './ui/dialog'
import { StoreProfileDialog } from './store-profile-dialog'

export const AccountMenu = () => {

  const { data: profile, isLoading: isGetProfileLoading} = useQuery({
    queryKey: ['get-profile'],
    queryFn: getProfile
  })

  const { data: managedRestaurant, isLoading: isGetManagedRestaurantLoading } = useQuery({
    queryKey: ['get-managed-restaurant'],
    queryFn: getManagedRestaurant
  })

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="flex select-none items-center gap-2"
          >
            {isGetManagedRestaurantLoading ? <Skeleton className='h-4 w-40'/> : managedRestaurant?.name}
            <ChevronDown className="size-4" />
          </Button>
        </DropdownMenuTrigger> 
        
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel className="flex flex-col">
            {isGetProfileLoading ? 
              <div className='space-y-1.5'>
                <Skeleton className='h-4 w-32'/>
                <Skeleton className='h-3 w-24'/>
              </div> : 
              <>
                <span>{profile?.name}</span>
                <span className="text-xs font-normal text-muted-foreground">
                  {profile?.email}
                </span>
              </>
            }
            
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DialogTrigger asChild>
            <DropdownMenuItem>
              <Building className="mr-2 size-4" />
              <span>Store profile</span>
            </DropdownMenuItem>
          </DialogTrigger>
          <DropdownMenuItem className="text-rose-500 dark:text-rose-400">
            <LogOut className="mr-2 size-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <StoreProfileDialog />
    </Dialog>
  )
}
