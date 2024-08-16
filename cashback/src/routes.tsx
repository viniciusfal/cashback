import { createBrowserRouter } from 'react-router-dom'
import { AuthLayout } from './pages/_layouts/auth'
import { SingIn } from './pages/auth/sign-in'
import { Dashboard } from './pages/app/dashboard'
import { AppLayout } from './pages/_layouts/app'
import { RegisterPassenger } from './pages/app/register-passenger'
import { ListCredits } from './pages/app/list-credits'
import { ImportPassengers } from './pages/app/import-passengers'
import { ImportCredits } from './pages/app/import-credits'

export const router: any = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Dashboard />,
      },
    ],
  },
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/register-passenger',
        element: <RegisterPassenger />,
      },
    ],
  },
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/import-passengers',
        element: <ImportPassengers />,
      },
    ],
  },
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/import-credits',
        element: <ImportCredits />,
      },
    ],
  },
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/list-credits',
        element: <ListCredits />,
      },
    ],
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        path: '/sign-in',
        element: <SingIn />,
      },
    ],
  },
])
