import { Utensils } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useQuery } from '@tanstack/react-query'
import { getDayOrdersAmount } from '@/api/get-day-orders-amount'
import { MetricsCardSkeleton } from './metrics-card-skeleton'

export const DailyOrdersAmountCard = () => {
  const {data: dayOrdersAmount} = useQuery({
    queryKey: ['metrics', 'daily-orders-amount'],
    queryFn: getDayOrdersAmount
  })

  return (
    <Card className="bg-transparent">
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          Orders (daily)
        </CardTitle>
        <Utensils className="size-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1">
        {dayOrdersAmount ? (
            <>
              <span className="text-2xl font-bold tracking-tight">{dayOrdersAmount.amount.toLocaleString('en-US')}</span>
              <p className="text-xs text-muted-foreground">
                {dayOrdersAmount.diffFromYesterday >= 0 ? (
                  <>
                    <span className="text-emerald-500 dark:text-emerald-400">+{dayOrdersAmount.diffFromYesterday}%</span>{' '}
                    compared to yesterday
                  </>
                ) : (
                  <>
                    <span className="text-rose-500 dark:text-rose-400">{dayOrdersAmount.diffFromYesterday}%</span>{' '}
                    compared to yesterday
                  </>
                )}
              </p>
            </>
          ) : <MetricsCardSkeleton />}
      </CardContent>
    </Card>
  )
}
