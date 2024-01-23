import { Pizza } from 'lucide-react'
import { Outlet } from 'react-router-dom'

import { Toaster } from '@/components/ui/Toast'

export const AuthLayout = () => {
  return (
    <>
      <div className="grid min-h-screen grid-cols-2">
        <div className="flex h-full flex-col justify-between border-r border-foreground/5 bg-muted p-10 text-muted-foreground">
          <div className="flex items-center gap-3 text-lg text-foreground">
            <Pizza className="size-5" />
            <span className="font-semibold">Pizza Shop</span>
          </div>
          <footer>Partner Dashboard &copy; {new Date().getFullYear()}</footer>
        </div>
        <div className="relative flex flex-col items-center justify-center">
          <Outlet />
        </div>
      </div>

      <Toaster />
    </>
  )
}
