import { Helmet } from 'react-helmet-async'

import { Pagination } from '@/components/pagination'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { OrderTableFilters } from './order-table-filters'
import { OrderTableRow } from './order-table-row'
import { useQuery } from '@tanstack/react-query'
import { getOrders } from '@/api/get-orders'
import { z } from 'zod'
import { useSearchParams } from 'react-router-dom'

export const OrdersPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();    

  const pageIndex = z.coerce
    .number()
    .transform(page => page - 1)
    .parse(searchParams.get('page') ?? '1')

  const orderId = searchParams.get('orderId');
  const clientName = searchParams.get('clientName');
  const status = searchParams.get('status');

  const { data: result } = useQuery({
    queryKey: ['orders', String(searchParams)],
    queryFn: () => getOrders({
      pageIndex, 
      ...(orderId && { orderId }),
      ...(clientName && { customerName: clientName }),
      ...(status !== 'all' && { status }),
    })
  })

  return (
    <>
      <Helmet title="Orders" />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
        <div className="space-y-2.5">
          <OrderTableFilters />

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[64px]"></TableHead>
                  <TableHead className="w-[140px]">Identifier</TableHead>
                  <TableHead className="w-[180px]">Created</TableHead>
                  <TableHead className="w-[140px]">Status</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead className="w-[140px]">Order total</TableHead>
                  <TableHead className="w-[164px]"></TableHead>
                  <TableHead className="w-[132px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {result && result.orders.map(order => (
                  <OrderTableRow key={order.orderId} order={order}/>
                ))}
              </TableBody>
            </Table>
          </div>

          {result && (
            <Pagination
              totalCount={result.meta.totalCount}
              perPage={result.meta.perPage}
            />
          )}
        </div>
      </div>
    </>
  )
}
