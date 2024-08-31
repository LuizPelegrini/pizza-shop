import { ComponentPropsWithoutRef, FC, useState } from 'react'
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
import { DateRangePicker } from '@/components/ui/date-range-picker'
import { DateRange } from 'react-day-picker'
import { subDays } from 'date-fns'
import { LoadingChartSpinner } from './loading-chart-spinner'

export const RevenueChart: FC<ComponentPropsWithoutRef<typeof Card>> = ({
  className,
  ...props
}) => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subDays(new Date(), 7),
    to: new Date()
  })

  const { data: dailyRevenueInPeriod } = useQuery({
    queryKey: ['metrics', 'daily-revenue-in-period', dateRange],
    queryFn: async () => {
      return getDailyRevenueInPeriod({ from: dateRange?.from, to: dateRange?.to })
    },
  })

  return (
    <Card className={cn('bg-transparent', className)} {...props}>
      <CardHeader className="flex-row items-center justify-between pb-8">
        <div className="space-y-1">
          <CardTitle>Revenue</CardTitle>
          <CardDescription>Daily revenue</CardDescription>
        </div>
        <div className='flex items-center gap-3'>
          <label htmlFor="date-picker">Date range:</label>
          <DateRangePicker date={dateRange} onDateRangeChange={setDateRange}/>
        </div>
      </CardHeader> 
      <CardContent>
        {dailyRevenueInPeriod ? (
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
                  }).format(value / 100)
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
        ) : <LoadingChartSpinner />}
      </CardContent>
    </Card>
  )
}
