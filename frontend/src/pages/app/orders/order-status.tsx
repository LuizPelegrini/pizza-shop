import { FC, ReactNode } from "react";

export type Status = "pending" | "canceled" | "processing" | "delivering" | "delivered";

type OrderStatusProps = {
  status: Status
}

const statusMap: Record<Status, { text: string, element: () => ReactNode }> = {
  pending: {
    text: 'Pending',
    element: () => <span data-testid="badge" className="size-2 rounded-full bg-slate-400" />
  },
  processing: {
    text: 'Processing',
    element: () => <span data-testid="badge" className="size-2 rounded-full bg-amber-500" />
  },
  canceled: {
    text: 'Canceled',
    element: () => <span data-testid="badge" className="size-2 rounded-full bg-rose-500" />
  },
  delivered: {
    text: 'Delivered',
    element: () => <span data-testid="badge" className="size-2 rounded-full bg-emerald-500" />
  },
  delivering: {
    text: 'Delivering',
    element: () => <span data-testid="badge" className="size-2 rounded-full bg-amber-500" />
  }
}

export const OrderStatus: FC<OrderStatusProps> = ({ status }) => {
  const { text, element: StatusElement } = statusMap[status];

  return (
    <div className="flex items-center gap-2">
      <StatusElement />
      <span className="font-medium text-muted-foreground">{text}</span>
    </div>
  )
}