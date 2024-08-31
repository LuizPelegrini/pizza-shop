import { BarChart } from 'lucide-react'
import { ComponentPropsWithoutRef, FC } from 'react'
import {
  Cell,
  Pie,
  PieChart,
  PieLabelRenderProps,
  ResponsiveContainer,
} from 'recharts'
import colors from 'tailwindcss/colors'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { useQuery } from '@tanstack/react-query'
import { getPopularProducts } from '@/api/get-popular-products'
import { LoadingChartSpinner } from './loading-chart-spinner'

const COLORS = [
  colors.sky['500'],
  colors.violet['500'],
  colors.amber['500'],
  colors.emerald['500'],
  colors.rose['500'],
]

export const PopularProductsChart: FC<
  ComponentPropsWithoutRef<typeof Card>
> = ({ className, ...props }) => {
  const { data: popularProducts } = useQuery({
    queryKey: ['metrics', 'popular-products'],
    queryFn: getPopularProducts
  })

  return (
    <Card className={cn('bg-transparent', className)} {...props}>
      <CardHeader className="pb-8">
        <div className="flex flex-grow items-center justify-between">
          <CardTitle>Popular products</CardTitle>
          <BarChart className="size-4 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent>
        {popularProducts ? (
          <ResponsiveContainer width="100%" height={240}>
            <PieChart style={{ fontSize: 12 }}>
              <Pie
                data={popularProducts}
                strokeWidth={8}
                dataKey="amount"
                nameKey="product"
                cx="50%"
                cy="50%"
                outerRadius={100}
                innerRadius={70}
                label={CustomLabel}
                labelLine={false}
                className="outline-none"
              >
                {popularProducts.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index]}
                    className="stroke-background outline-none transition-opacity hover:opacity-80"
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        ) :  <LoadingChartSpinner />}
      </CardContent>
    </Card>
  )
}

const CustomLabel: FC<PieLabelRenderProps> = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  value,
  name
}) => {
  const RADIAN = Math.PI / 180
  const radius =
    12 + Number(innerRadius) + (Number(outerRadius) - Number(innerRadius))
  const x = Number(cx) + radius * Math.cos(-midAngle * RADIAN)
  const y = Number(cy) + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text
      x={x}
      y={y}
      className="fill-muted-foreground text-xs"
      textAnchor={x > Number(cx) ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {name.length > 12
        ? name.substring(0, 12).concat('...')
        : name}{' '}
      ({value})
    </text>
  )
}
