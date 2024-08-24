import { api } from "@/lib/axios";

type CancelOrderParams = {
  id: string;
}

export const cancelOrder = async ({ id }: CancelOrderParams) => {
  await api.patch(`/orders/${id}/cancel`);
}