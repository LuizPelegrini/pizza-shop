import { Home, Pizza, UtensilsCrossed } from 'lucide-react'

import { AccountMenu } from '@/components/account-menu'
import { NavLink } from '@/components/nav-link'
import { ThemeToggle } from '@/components/theme-toggle'
import { Separator } from '@/components/ui/separator'

export const Header = () => {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center gap-6 px-6">
        <Pizza className="size-6" />
        <Separator orientation="vertical" className="h-6" />
        <nav className="flex items-center space-x-4 lg:space-x-6">
          <NavLink to="/">
            <Home className="size-4" />
            Dashboard
          </NavLink>
          <NavLink to="/orders">
            <UtensilsCrossed className="size-4" />
            Orders
          </NavLink>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          <AccountMenu />
        </div>
      </div>
    </div>
  )
}
