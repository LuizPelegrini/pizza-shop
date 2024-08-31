import { ComponentPropsWithoutRef, FC } from 'react'
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'
import colors from 'tailwindcss/colors'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { useQuery } from '@tanstack/react-query'
import { getDailyRevenueInPeriod } from '@/api/get-daily-revenue-in-period'

export const RevenueChart: FC<ComponentPropsWithoutRef<typeof Card>> = ({
  className,
  ...props
}) => {
  const { data: dailyRevenueInPeriod } = useQuery({
    queryKey: ['metrics', 'daily-revenue-in-period'],
    queryFn: getDailyRevenueInPeriod
  })

  return (
    <Card className={cn('bg-transparent', className)} {...props}>
      <CardHeader className="flex-row items-center justify-between pb-8">
        <div className="space-y-1">
          <CardTitle>Revenue</CardTitle>
          <CardDescription>Daily revenue</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        {dailyRevenueInPeriod && (
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={dailyRevenueInPeriod} style={{ fontSize: 12 }}>
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                dy={10}
              />
              <YAxis
                stroke="#888"
                axisLine={false}
                tickLine={false}
                width={80}
                tickFormatter={(value: number) =>
                  Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  }).format(value)
                }
              />
              <CartesianGrid vertical={false} className="stroke-muted" />

              <Line
                type="linear"
                strokeWidth={2}
                dataKey="receipt"
                stroke={colors.violet['500']}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  )
}
