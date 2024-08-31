import { Utensils } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useQuery } from '@tanstack/react-query'
import { getMonthOrdersAmount } from '@/api/get-month-orders-amount'
import { MetricsCardSkeleton } from './metrics-card-skeleton'

export const MonthlyOrdersAmountCard = () => {
  const { data: monthOrdersAmount } = useQuery({
    queryKey: ['metrics', 'month-orders-amount'],
    queryFn: getMonthOrdersAmount
  })

  return (
    <Card className="bg-transparent">
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          Orders (monthly)
        </CardTitle>
        <Utensils className="size-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1">
      {monthOrdersAmount ? (
          <>
            <span className="text-2xl font-bold tracking-tight">{monthOrdersAmount.amount.toLocaleString('en-US')}</span>
            <p className="text-xs text-muted-foreground">
              {monthOrdersAmount.diffFromLastMonth >= 0 ? (
                <>
                  <span className="text-emerald-500 dark:text-emerald-400">+{monthOrdersAmount.diffFromLastMonth}%</span>{' '}
                  compared to last month
                </>
              ) : (
                <>
                  <span className="text-rose-500 dark:text-rose-400">{monthOrdersAmount.diffFromLastMonth}%</span>{' '}
                  compared to last month
                </>
              )}
            </p>
          </>
        ) : <MetricsCardSkeleton />}
      </CardContent>
    </Card>
  )
}
