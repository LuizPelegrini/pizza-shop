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
}

export const getOrders = async ({ pageIndex }: GetOrdersQuery) => {
  const response = await api.get<GetOrdersResponse>('/orders', {
    params: { pageIndex }
  });
  return response.data;
}