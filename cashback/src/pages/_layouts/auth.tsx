import { BusFront } from 'lucide-react'
import { Outlet } from 'react-router-dom'
export function AuthLayout() {
  return (
    <div className="grid min-h-screen grid-cols-2">
      <section className="flex h-full flex-col justify-between border-r border-foreground/5 bg-primary p-10 text-primary-foreground dark:bg-green-500 ">
        <div className="flex items-center gap-3 text-lg text-primary-foreground dark:text-primary-foreground">
          <BusFront className="h-5 w-5" />

          <span className="font-semibold">Cashback</span>
        </div>

        <footer className="text-sm dark:text-primary-foreground">
          Desenvolvido por Vinicius Silva &copy; | Cashback -{' '}
          {new Date().getFullYear()}
        </footer>
      </section>

      <section className=" relative flex flex-col items-center justify-center">
        <Outlet />
      </section>
    </div>
  )
}
