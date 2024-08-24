import { api } from "@/lib/axios"

type GetMonthOrdersAmountResponse = {
  amount: number;
  diffFromLastMonth: number;
}

export const getMonthOrdersAmount = async () => {
  const response = await api.get<GetMonthOrdersAmountResponse>('/metrics/month-orders-amount');
  return response.data;
}