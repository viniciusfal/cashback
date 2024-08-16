import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'

export function Menu() {
  return (
    <NavigationMenu className="space-x-4">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-secondary-foreground hover:text-primary hover:transition-colors text-sm">
            Passageiros
          </NavigationMenuTrigger>
          <NavigationMenuContent className="flex flex-col justify-start gap-2  pr-8 pl-2 py-3 items-start text-sm">
            <NavigationMenuLink
              className="w-24 hover:text-primary hover:transition-colors"
              href="/register-passenger"
            >
              Cadastrar
            </NavigationMenuLink>
            <NavigationMenuLink
              className="w-24 hover:text-primary hover:transition-colors"
              href="/import-passengers"
            >
              Importar
            </NavigationMenuLink>
            <NavigationMenuLink
              className="w-20 hover:text-primary hover:transition-colors"
              href="/"
            >
              Listar
            </NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>

      <NavigationMenuList>
        <NavigationMenuItem className="text-secondary-foreground hover:text-primary hover:transition-colors text-sm">
          <NavigationMenuLink href="/list-credits">
            {' '}
            Historico
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>

      <NavigationMenuList>
        <NavigationMenuItem className="text-secondary-foreground hover:text-primary hover:transition-colors text-sm">
          <NavigationMenuLink href="/import-credits">
            {' '}
            Imp/Creditos
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
