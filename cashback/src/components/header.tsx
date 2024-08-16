import { BusFront, LogOut } from 'lucide-react'

import { ThemeToggle } from './theme/theme-toggle'
import { Separator } from './ui/separator'

import { Menu } from './menu'
import { Link } from 'react-router-dom'

export function Header() {
  return (
    <div className="border-b text-primary">
      <div className="flex h-16 items-center gap-6 px-6">
        <Link to="/">
          <BusFront className="h-6 w-6" />
        </Link>
        <Separator orientation="vertical" className="h-6" />

        <div className="ml-auto flex items-center gap-6">
          <Menu />
          <div className="flex items-center gap-2">
            <div className="text-secondary-foreground" title="Trocar o Tema">
              <ThemeToggle />
            </div>
            <div className="text-muted-foreground hover:text-destructive hover:transition-colors cursor-pointer ">
              <Link to="/sign-in" title="Sair">
                <LogOut />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
