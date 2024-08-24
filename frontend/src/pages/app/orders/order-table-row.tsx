import { X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'

import { OrderDetails } from './order-details'
import { FC } from 'react'
import { OrderStatus, type Status } from './order-status'

import { formatDistanceToNow } from 'date-fns';
import { enUS } from 'date-fns/locale'
import { formatPrice } from '@/utils/currency-formatter'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { cancelOrder } from '@/api/cancel-order'
import type { GetOrdersResponse } from '@/api/get-orders'
import { approveOrder } from '@/api/approve-order'
import { deliverOrder } from '@/api/deliver-order'
import { dispatchOrder } from '@/api/dispatch-order'
import { OrderActionButton } from './order-action-button'

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
  const queryClient = useQueryClient()

  const updateOrdersListCache = (id: string, status: Status) => {
    // get all queries cached that starts with 'orders' (see ./orders/index.tsx)
    const ordersListCachedQueries = queryClient.getQueriesData<GetOrdersResponse>({
      queryKey: ['orders']
    })

    // loop through each cache and override its data with the new status for the canceled order 
    ordersListCachedQueries.forEach(([key, cachedData]) => {
      if(!cachedData) return;

      queryClient.setQueryData<GetOrdersResponse>(key, {
        ...cachedData,
        orders: cachedData.orders.map(order => {
          if(order.orderId === id) {
            return {
              ...order,
              status
            }
          }

          return order
        })
      })
    })
  }

  const {mutateAsync: cancelOrderFn, isPending: isCanceling} = useMutation({
    mutationFn: cancelOrder,
    // we want to iterate over all queries cache when we cancel an order and update those that contains the order before. As some queries (like when using filters or pagination) must have been executed before and we want to display the freshest data
    onSuccess: (_, { id }) => {
      updateOrdersListCache(id, 'canceled')
    }
  })

  const {mutateAsync: approveOrderFn, isPending: isApproving} = useMutation({
    mutationFn: approveOrder,
    onSuccess: (_, { id }) => {
      updateOrdersListCache(id, 'processing')
    }
  })

  const {mutateAsync: dispatchOrderFn, isPending: isDispatching} = useMutation({
    mutationFn: dispatchOrder,
    onSuccess: (_, { id }) => {
      updateOrdersListCache(id, 'delivering')
    }
  })

  const {mutateAsync: deliverOrderFn, isPending: isDelivering} = useMutation({
    mutationFn: deliverOrder,
    onSuccess: (_, { id }) => {
      updateOrdersListCache(id, 'delivered')
    }
  })

  return (
    <TableRow>
      <TableCell>
        <OrderDetails orderId={orderId} />
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
        {order.status === 'pending' && (
          <OrderActionButton disabled={isApproving} onClick={() => approveOrderFn({ id: orderId})}>
            Approve
          </OrderActionButton>
        )}

        {order.status === 'processing' && (
          <OrderActionButton disabled={isDispatching} onClick={() => dispatchOrderFn({ id: orderId})}>
            Dispatch
          </OrderActionButton>
        )}

        {order.status === 'delivering' && (
          <OrderActionButton disabled={isDelivering} onClick={() => deliverOrderFn({ id: orderId})}>
            Delivered
          </OrderActionButton>
        )}
      </TableCell>
      <TableCell>
        <Button
          variant="ghost"
          size="xs"
          onClick={() => cancelOrderFn({ id: orderId})}
          disabled={!['pending', 'processing'].includes(status) || isCanceling}
        >
          <X className="mr-2 size-3" />
          Cancel
        </Button>
      </TableCell>
    </TableRow>
  )
}
