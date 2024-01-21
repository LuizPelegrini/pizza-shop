import { createBrowserRouter } from 'react-router-dom'

import { Dashboard } from './pages/app/dashboard'
import { SignIn } from './pages/auth/sign-in'

export const router = createBrowserRouter([
  { path: '/', Component: Dashboard },
  { path: '/sign-in', Component: SignIn },
])
