import { api } from "@/lib/axios";

type DeliverOrderParams = {
  id: string;
}

export const deliverOrder = async ({ id }: DeliverOrderParams) => {
  await api.patch(`/orders/${id}/deliver`);
}