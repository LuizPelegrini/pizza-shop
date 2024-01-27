import { ArrowRight, Search, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'

export const OrderTableRow = () => {
  return (
    <TableRow>
      <TableCell>
        <Button variant="outline" size="xs">
          <Search className="size-3" />
          <span className="sr-only">Order details</span>
        </Button>
      </TableCell>
      <TableCell className="font-mono text-xs font-medium">
        dkjakdjasjdlalsd
      </TableCell>
      <TableCell className="text-muted-foreground">15 min ago</TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-slate-400" />
          <span className="font-medium text-muted-foreground">Pending</span>
        </div>
      </TableCell>
      <TableCell className="font-medium">Luiz Pelegrini</TableCell>
      <TableCell className="font-medium">$45.90</TableCell>
      <TableCell>
        <Button variant="outline" size="xs">
          <ArrowRight className="mr-2 size-3" />
          Approve
        </Button>
      </TableCell>
      <TableCell>
        <Button variant="ghost" size="xs">
          <X className="mr-2 size-3" />
          Cancel
        </Button>
      </TableCell>
    </TableRow>
  )
}
