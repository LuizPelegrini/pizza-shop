import { api } from "@/lib/axios"

type GetDailyRevenueInPeriodResponse = {
  date: string;
  receipt: number;
}[]

export const getDailyRevenueInPeriod = async () => {
  const response = await api.get<GetDailyRevenueInPeriodResponse>('/metrics/daily-receipt-in-period');
  return response.data;
}