import { Search } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { FC, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getOrderDetails } from '@/api/get-order-details'
import { OrderStatus } from './order-status'
import { formatDistanceToNow } from 'date-fns';
import { enUS } from 'date-fns/locale'
import { formatPrice } from '@/utils/currency-formatter'

type OrderDetailsProps = {
  orderId: string;
}

export const OrderDetails: FC<OrderDetailsProps> = ({ orderId }) => {
  const [isDialogOpened, setIsDialogOpened] = useState(false);

  const { data: order } = useQuery({
    queryKey: ['order', orderId],
    queryFn: () => getOrderDetails({ id: orderId }),
    enabled: isDialogOpened,
    staleTime: Infinity
  });

  return (
    <Dialog open={isDialogOpened} onOpenChange={setIsDialogOpened}>
      <DialogTrigger asChild>
        <Button variant="outline" size="xs">
          <Search className="size-3" />
          <span className="sr-only">Order details</span>
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Order: {orderId }</DialogTitle>
          <DialogDescription>Order details</DialogDescription>
        </DialogHeader>
        {order && (
          <div className="space-y-6">
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className="text-muted-foreground">Status</TableCell>
                  <TableCell className="flex justify-end">
                    <OrderStatus status={order.status}/>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="text-muted-foreground">Client</TableCell>
                  <TableCell className="flex justify-end">
                    {order.customer.name}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="text-muted-foreground">
                    Contact number
                  </TableCell>
                  <TableCell className="flex justify-end">
                    {order.customer.phone || 'Not provided'}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="text-muted-foreground">Email</TableCell>
                  <TableCell className="flex justify-end">
                    {order?.customer.email}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="text-muted-foreground">Created</TableCell>
                  <TableCell className="flex justify-end">
                    {formatDistanceToNow(order.createdAt, { locale: enUS })}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead className="text-right">Qtd.</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-right">Subtotal</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {order.orderItems.map(({ id, priceInCents, product, quantity }) => (
                  <TableRow key={id}>
                    <TableCell>{product.name}</TableCell>
                    <TableCell className="text-right">{quantity}</TableCell>
                    <TableCell className="text-right">{formatPrice(priceInCents / 100)}</TableCell>
                    <TableCell className="text-right">{formatPrice(priceInCents * quantity / 100)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={3}>Order total</TableCell>
                  <TableCell className="text-right font-medium">{formatPrice(order.totalInCents / 100)}</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
