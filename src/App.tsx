import './global.css'

import { Helmet, HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'

import { ThemeProvider } from '@/components/providers/theme-provider'

import { router } from './router'

export function App() {
  return (
    <HelmetProvider>
      <ThemeProvider storageKey="pizzashop-theme">
        <Helmet titleTemplate="%s | Pizza Shop" />
        <RouterProvider router={router} />
      </ThemeProvider>
    </HelmetProvider>
  )
}
