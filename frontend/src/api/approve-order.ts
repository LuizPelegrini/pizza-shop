import { api } from "@/lib/axios";

type ApproveOrderParams = {
  id: string;
}

export const approveOrder = async ({ id }: ApproveOrderParams) => {
  await api.patch(`/orders/${id}/approve`);
}