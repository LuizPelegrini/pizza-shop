import { ComponentPropsWithoutRef, FC } from 'react'
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
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

const data = [
  { date: '2024-01-01', revenue: 401 },
  { date: '2024-01-02', revenue: 320 },
  { date: '2024-01-03', revenue: 417 },
  { date: '2024-01-04', revenue: 204 },
  { date: '2024-01-05', revenue: 638 },
  { date: '2024-01-06', revenue: 450 },
  { date: '2024-01-07', revenue: 526 },
]

export const RevenueChart: FC<ComponentPropsWithoutRef<typeof Card>> = ({
  className,
  ...props
}) => {
  return (
    <Card className={cn('bg-transparent', className)} {...props}>
      <CardHeader className="flex-row items-center justify-between pb-8">
        <div className="space-y-1">
          <CardTitle>Revenue</CardTitle>
          <CardDescription>Daily revenue</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={data} style={{ fontSize: 12 }}>
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              dy={10}
              tickFormatter={(value: string) =>
                Intl.DateTimeFormat('en-US', {
                  dateStyle: 'medium',
                }).format(new Date(value))
              }
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
              dataKey="revenue"
              stroke={colors.violet['500']}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
