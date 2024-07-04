import { api } from "@/lib/axios";

type GetOrderDetailsParams = {
  id: string;
}

type GetOrderDetailsResponse = {
  status: "pending" | "canceled" | "processing" | "delivering" | "delivered";
  id: string;
  createdAt: string;
  totalInCents: number;
  customer: {
    name: string;
    email: string;
    phone: string | null;
  };
  orderItems: {
    id: string;
    priceInCents: number;
    quantity: number;
    product: {
      name: string;
    }
  }[]
}

export const getOrderDetails = async ({ id }: GetOrderDetailsParams) => {
  const response = await api.get<GetOrderDetailsResponse>(`/orders/${id}`);

  return response.data;
}