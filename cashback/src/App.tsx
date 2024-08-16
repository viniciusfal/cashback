import './globals.css'

import { Helmet, HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'
import { QueryClientProvider } from '@tanstack/react-query'

import { ThemeProvider } from './components/theme/theme-provider'
import { router } from './routes'
import { queryClient } from './lib/query-client'
export function App() {
  return (
    <HelmetProvider>
      <ThemeProvider defaultTheme="light" storageKey="deliverysync-theme">
        <Helmet titleTemplate="%s | Cashback" />
        <Toaster richColors />
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </ThemeProvider>
    </HelmetProvider>
  )
}
