import { Search, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { z } from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSearchParams } from 'react-router-dom'

const orderFiltersSchema = z.object({
  orderId: z.string().optional(),
  clientName: z.string().optional(),
  status: z.string().optional(),
})

type OrderFilterSchema = z.infer<typeof orderFiltersSchema>

export const OrderTableFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const orderId = searchParams.get('orderId');
  const clientName = searchParams.get('clientName');
  const status = searchParams.get('status');

  const { register, handleSubmit, control, reset } = useForm<OrderFilterSchema>({
    resolver: zodResolver(orderFiltersSchema),
    defaultValues: {
      orderId: orderId ?? '',
      clientName: clientName ?? '',
      status: status ?? 'all'
    }
  });

  return (
    <form
      className="flex items-center gap-2"
      onSubmit={handleSubmit(({ clientName, orderId, status }) => {
        setSearchParams(state => {
          if(orderId) {
            state.set('orderId', orderId)
          } else {
            state.delete('orderId')
          }

          if(clientName) {
            state.set('clientName', clientName)
          } else {
            state.delete('clientName')
          }

          if(status) {
            state.set('status', status)
          } else {
            state.delete('status')
          }

          state.set('page', '1')

          return state;
        })
      })}
    >
      <span className="text-sm font-semibold">Filters:</span>
      <Input
        placeholder="Order ID"
        className="h-8 w-fit"
        {...register('orderId')}
      />
      <Input
        placeholder="Client name"
        className="h-8 w-[320px]"
        {...register('clientName')}
      />
      
      <Controller
        name="status"
        control={control}
        render={({ field: { name, onChange, value }}) => (
          <Select defaultValue="all"
            name={name}
            onValueChange={onChange}
            value={value}
          >
            <SelectTrigger className="h-8 w-[180px] select-none">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="canceled">Canceled</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="delivering">Delivering</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
            </SelectContent>
          </Select>
        )}
      />

      <Button type="submit" variant="secondary" size="xs">
        <Search className="mr-2 size-4" />
        Search
      </Button>

      <Button
        type="button"
        variant="outline"
        size="xs"
        onClick={() => {
          setSearchParams(state => {
            state.delete('orderId');
            state.delete('clientName');
            state.delete('status');
            state.set('page', '1');
            return state
          })

          reset();
        }}
      >
        <X className="mr-2 size-4" />
        Remove filters
      </Button>
    </form>
  )
}
