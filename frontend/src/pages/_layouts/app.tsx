import { Outlet, useNavigate } from 'react-router-dom'

import { Header } from '@/components/header'
import { Toaster } from '@/components/ui/Toast'
import { useEffect } from 'react';
import { api } from '@/lib/axios';
import { isAxiosError } from 'axios';

export const AppLayout = () => {
  const navigate = useNavigate();

  // navigate the user back to sign-in if any API response returns a 401 status
  useEffect(() => {
    const interceptorId = api.interceptors.response.use(
      response => response,
      error => {
        if(isAxiosError(error)){
          if(error.response?.status === 401 && error.response?.data.code === 'UNAUTHORIZED') {
            navigate('/sign-in', { replace: true })
          }else{
            // pass down the error, so react-query can access it, otherwise the RQ 'onSuccess' callback is called
            throw error
          }
        }
      }
    )

    return () => api.interceptors.response.eject(interceptorId)
  }, [navigate]);

  return (
    <div className="flex min-h-screen flex-col antialiased">
      <Header />
      <div className="flex flex-1 flex-col gap-4 p-8 pt-6">
        <Outlet />
      </div>
      <Toaster />
    </div>
  )
}
