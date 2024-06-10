import { FC } from "react";

type Status = "pending" | "canceled" | "processing" | "delivering" | "delivered";

type OrderStatusProps = {
  status: Status
}

const statusMap: Record<Status, string> = {
  pending: 'Pending',
  processing: 'Processing',
  canceled: 'Canceled',
  delivered: 'Delivered',
  delivering: 'Delivering'
}

export const OrderStatus: FC<OrderStatusProps> = ({ status }) => {

  return (
    <div className="flex items-center gap-2">
      {status === 'pending' && <span className="size-2 rounded-full bg-slate-400" />}
      {status === 'canceled' && <span className="size-2 rounded-full bg-rose-500" />}
      {status === 'delivered' && <span className="size-2 rounded-full bg-emerald-500" />}
      {['delivering', 'processing'].includes(status) && <span className="size-2 rounded-full bg-amber-500" />}
      <span className="font-medium text-muted-foreground">{statusMap[status]}</span>
    </div>
  )
}