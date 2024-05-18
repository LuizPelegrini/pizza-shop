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

export const OrderTableFilters = () => {
  return (
    <form className="flex items-center gap-2">
      <span className="text-sm font-semibold">Filters:</span>
      <Input placeholder="Order ID" className="h-8 w-fit" />
      <Input placeholder="Client name" className="h-8 w-[320px]" />
      <Select defaultValue="all">
        <SelectTrigger className="h-8 w-[180px] select-none">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="cancelled">Cancelled</SelectItem>
          <SelectItem value="processing">Processing</SelectItem>
          <SelectItem value="delivering">Delivering</SelectItem>
          <SelectItem value="delivered">Delivered</SelectItem>
        </SelectContent>
      </Select>

      <Button type="submit" variant="secondary" size="xs">
        <Search className="mr-2 size-4" />
        Search
      </Button>

      <Button type="button" variant="outline" size="xs">
        <X className="mr-2 size-4" />
        Remove filters
      </Button>
    </form>
  )
}
