import { api } from "@/lib/axios";

type DispatchOrderParams = {
  id: string;
}

export const dispatchOrder = async ({ id }: DispatchOrderParams) => {
  await api.patch(`/orders/${id}/dispatch`);
}