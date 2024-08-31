import { api } from "@/lib/axios"

type GetDailyRevenueInPeriodResponse = {
  date: string;
  receipt: number;
}[]

type GetDailyRevenueInPeriodParams = {
  from?: Date;
  to?: Date;
}

export const getDailyRevenueInPeriod = async ({ from, to }: GetDailyRevenueInPeriodParams) => {
  const response = await api.get<GetDailyRevenueInPeriodResponse>('/metrics/daily-receipt-in-period', {
    params: {
      from,
      to
    }
  });
  return response.data;
}