import { api } from "@/lib/axios"

type GetOrdersResponse = {
  orders: {
    orderId: string;
    createdAt: string;
    status: "pending" | "canceled" | "processing" | "delivering" | "delivered";
    customerName: string;
    total: number;
  }[];
  meta: {
    pageIndex: number;
    perPage: number;
    totalCount: number;
  };
}

type GetOrdersQuery = {
  pageIndex?: number | null
  customerName?: string | null
  orderId?: string | null
  status?: string | null
}

export const getOrders = async ({ pageIndex, customerName, orderId, status }: GetOrdersQuery) => {
  const response = await api.get<GetOrdersResponse>('/orders', {
    params: {
      orderId,
      pageIndex,
      customerName,
      status
    }
  });
  return response.data;
}