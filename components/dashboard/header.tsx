'use client';

import { Bell, Search } from 'lucide-react';
import { ThemeToggle } from '../theme-toggle';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { signOut } from 'next-auth/react';

interface HeaderProps {
  title: string;
  sidebarExpanded: boolean;
}

export function Header({ title, sidebarExpanded }: HeaderProps) {

  // const handleLogout = async (e: React.FormEvent) => {
  //     e.preventDefault()
  //
  //     try {
  //         const res = await fetch('/api/login', {
  //             method: 'POST',
  //             body: JSON.stringify({email, password}),
  //             headers: {'Content-Type': 'application/json'},
  //         })
  //
  //         if (!res.ok) throw new Error('Credenciales inválidas')
  //
  //         router.push('/dashboard')
  //     } catch (err: any) {
  //         setError(err.message)
  //     } finally {
  //         setLoading(false)
  //     }
  // }


  return (
    <header
      className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b border-border bg-background/95 px-6 backdrop-blur">
      <div className={cn('flex-1 transition-all', sidebarExpanded ? 'pl-0' : 'pl-0')}>
        <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
      </div>
      <div className="relative hidden md:flex">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search..."
          className="w-64 rounded-full bg-muted pl-8 md:w-80"
        />
      </div>
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="rounded-full relative">
              <Bell className="h-[1.2rem] w-[1.2rem]" />
              <span
                className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] text-primary-foreground flex items-center justify-center">
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-80" align="end">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {[
              { title: 'New message from Sarah', time: '2 min ago', unread: true },
              { title: 'New order #1234', time: '1 hour ago', unread: true },
              { title: 'Server update completed', time: '3 hours ago', unread: true },
              { title: 'Weekly report available', time: 'Yesterday', unread: false },
              { title: 'Payment received', time: '2 days ago', unread: false },
            ].map((notification, i) => (
              <DropdownMenuItem key={i} className="flex flex-col items-start py-2">
                <div className="flex items-center gap-2 w-full">
                  <span className={cn(
                    'h-2 w-2 rounded-full shrink-0',
                    notification.unread ? 'bg-primary' : 'bg-transparent',
                  )} />
                  <span className="font-medium">{notification.title}</span>
                </div>
                <span className="text-xs text-muted-foreground pl-4">
                  {notification.time}
                </span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <ThemeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="rounded-full">
              <span
                className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground font-medium">
                JD
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <button onClick={() => signOut({ callbackUrl: '/login' })}>
                Cerrar sesión
              </button>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <div>
                <a href="/login">Ir al login</a>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}