import { ArrowRight, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'

import { OrderDetails } from './order-details'
import { FC } from 'react'
import { OrderStatus } from './order-status'

import { formatDistanceToNow } from 'date-fns';
import { enUS } from 'date-fns/locale'
import { formatPrice } from '@/utils/currency-formatter'

type OrderTableRowProps = {
  order: {
    orderId: string;
    createdAt: string;
    status: "pending" | "canceled" | "processing" | "delivering" | "delivered";
    customerName: string;
    total: number;
  }
}

export const OrderTableRow: FC<OrderTableRowProps> = ({order}) => {
  const { orderId, createdAt, status, customerName, total } = order;

  return (
    <TableRow>
      <TableCell>
        <OrderDetails orderId={order.orderId} />
      </TableCell>
      <TableCell className="font-mono text-xs font-medium">
        {orderId}
      </TableCell>
      <TableCell className="text-muted-foreground">
        {formatDistanceToNow(createdAt, { locale: enUS })}
      </TableCell>
      <TableCell>
        <OrderStatus status={status} />
      </TableCell>
      <TableCell className="font-medium">{customerName}</TableCell>
      <TableCell className="font-medium">
        {formatPrice(total / 100)}
      </TableCell>
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
