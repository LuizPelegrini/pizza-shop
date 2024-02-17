import { DollarSign } from 'lucide-react'
import { Helmet } from 'react-helmet-async'

import { DailyOrdersAmountCard } from './daily-orders-amount-card'
import { MonthlyCancelledOrdersAmountCard } from './monthly-cancelled-orders-amount-card'
import { MonthlyOrdersAmountCard } from './monthly-orders-amount-card'
import { MonthlyRevenueCard } from './monthly-revenue-card'

export const Dashboard = () => {
  return (
    <>
      <Helmet title="Dashboard" />
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      <div className="grid grid-cols-4 gap-4">
        <MonthlyRevenueCard />
        <MonthlyOrdersAmountCard />
        <DailyOrdersAmountCard />
        <MonthlyCancelledOrdersAmountCard />
      </div>
    </>
  )
}
