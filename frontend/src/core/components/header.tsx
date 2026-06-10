import { Link, useLocation } from 'react-router-dom'
import { Bell, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { Badge } from '@/components/ui/badge'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetHeader
} from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import { useContext, useState } from 'react'
import { AuthContext } from '../context/auth-context'

const NAV_ITEMS = [
  { label: 'Atendimentos', href: '/' },
  { label: 'Clientes', href: '/clientes' },
  { label: 'Pets', href: '/pets' },
  { label: 'Pacotes', href: '/pacotes' },
  { label: 'Serviços', href: '/servicos' }
]

const notifications = [
  { id: 1, message: 'Thor possui apenas 1 banho restante no pacote.' },
  { id: 2, message: 'Pacote da Luna vence em 2 dias.' },
  { id: 3, message: 'Pacote do Mel venceu ontem.' }
]

export function Header() {
  const location = useLocation()
  const { logout, usuarioLogado } = useContext(AuthContext)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className='sticky top-0 z-50 w-full border-b bg-background px-4 md:px-6'>
      <div className='flex h-16 items-center justify-between md:grid md:grid-cols-3 w-full'>
        <div className='flex items-center justify-start'>
          <Link to='/' className='flex items-center gap-2 shrink-0'>
            <div className='flex h-8 w-8 items-center justify-center rounded-md bg-blue-400 text-white'>
              <PawIcon />
            </div>
            <span className='text-md font-medium'>
              Pet<span className='text-blue-400'>Shop</span>
            </span>
          </Link>
        </div>

        <nav className='hidden md:flex items-center justify-center gap-1 w-full'>
          {NAV_ITEMS.map(item => {
            const isActive =
              item.href === '/'
                ? location.pathname === '/'
                : location.pathname.includes(item.href)
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  'rounded-md px-3 py-1.5 text-sm transition-colors whitespace-nowrap',
                  isActive
                    ? 'bg-emerald-50 text-blue-600 font-medium'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className='flex items-center justify-end gap-2 shrink-0'>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant='outline'
                size='sm'
                className='h-9 px-2.5 border-pink-100 bg-background hover:bg-pink-50/50 flex items-center gap-1.5'
              >
                <Bell className='h-4 w-4 text-muted-foreground' />

                {notifications.length > 0 && (
                  <span className='h-2 w-2 rounded-full bg-pink-500 shrink-0' />
                )}

                <span className='sr-only'>Notificações</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent align='end' className='w-80 p-0 rounded-xl z-[60]'>
              <div className='flex items-center justify-between border-b px-4 py-3'>
                <span className='text-sm font-medium'>Notificações</span>
                <Badge variant='secondary'>{notifications.length}</Badge>
              </div>
              <ul className='divide-y'>
                {notifications.map(n => (
                  <li
                    key={n.id}
                    className='px-4 py-3 text-sm text-muted-foreground'
                  >
                    {n.message}
                  </li>
                ))}
              </ul>
              {notifications.length === 0 && (
                <p className='px-4 py-6 text-center text-sm text-muted-foreground'>
                  Nenhuma notificação.
                </p>
              )}
            </PopoverContent>
          </Popover>

          <div className='h-5 w-px bg-border mx-1 hidden sm:block' />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant='ghost'
                className='relative h-9 w-9 rounded-full p-0'
              >
                <Avatar className='h-8 w-8'>
                  <AvatarFallback className='bg-blue-400 text-white text-xs font-medium'>
                    {usuarioLogado?.nome
                      ? usuarioLogado.nome.substring(0, 2).toUpperCase()
                      : 'AD'}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='w-48 rounded-xl z-[60]'>
              <DropdownMenuLabel className='font-normal'>
                <div className='flex flex-col gap-0.5'>
                  <span className='text-sm font-medium'>
                    {usuarioLogado?.nome || 'Usuário'}
                  </span>
                  <span className='text-xs text-muted-foreground truncate'>
                    {usuarioLogado?.email || 'email.com'}
                  </span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className='text-red-600 focus:text-red-600 cursor-pointer'
                onClick={logout}
              >
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className='md:hidden ml-1'>
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant='outline' size='icon' className='h-9 w-9'>
                  <Menu className='h-5 w-5' />
                  <span className='sr-only'>Abrir menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side='left' className='w-72 pt-12 z-[60]'>
                <SheetHeader className='text-left mb-6'>
                  <SheetTitle className='text-lg font-bold flex items-center gap-2'>
                    <div className='flex h-7 w-7 items-center justify-center rounded-md bg-blue-400 text-white'>
                      <PawIcon />
                    </div>
                    <span>
                      Pet<span className='text-blue-400'>Shop</span>
                    </span>
                  </SheetTitle>
                </SheetHeader>
                <nav className='flex flex-col gap-2'>
                  {NAV_ITEMS.map(item => {
                    const isActive =
                      item.href === '/'
                        ? location.pathname === '/'
                        : location.pathname.startsWith(item.href)
                    return (
                      <Link
                        key={item.href}
                        to={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                          'rounded-lg px-4 py-2.5 text-base font-medium transition-colors',
                          isActive
                            ? 'bg-emerald-50 text-blue-600'
                            : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                        )}
                      >
                        {item.label}
                      </Link>
                    )
                  })}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}

function PawIcon() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      fill='currentColor'
      className='h-4 w-4'
    >
      <path d='M12 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM7 5a2 2 0 1 1 0 4A2 2 0 0 1 7 5zm10 0a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM4.5 10a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm15 0a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM12 11c-3 0-6 2-6 5 0 2 1.5 3 3 3h6c1.5 0 3-1 3-3 0-3-3-5-6-5z' />
    </svg>
  )
}
