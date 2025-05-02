'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BarChart2, ChevronLeft, ChevronRight, Home, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import Logo from '@/assets/images/logo.png';
import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

interface SidebarItem {
  id: number;
  title: string;
  href: string;
  icon: React.ReactNode;
}

const sidebarItems: SidebarItem[] = [
  { id: 1, title: 'Compañias', href: '/companies', icon: <Home size={20} /> },
  { id: 2, title: 'Módulos', href: '/modules', icon: <BarChart2 size={20} /> },
  { id: 3, title: 'Usuarios', href: '/users', icon: <Users size={20} /> },
  { id: 4, title: 'Configuraciones', href: '/configurations', icon: <Users size={20} /> },
];

export function Sidebar() {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(true);
  const { data: session, status } = useSession();
  const userLogged = status === 'authenticated';

  return (
    <div className={cn(
      'flex flex-col h-screen border-r ' +
      'border-border bg-gradient-to-b from-indigo-100 via-purple-100 to-pink-100  00 ' +
      'transition-all duration-300 dark:from-purple-800 dark:via-blue-900  dark:to-black ',
      expanded ? 'w-48' : 'w-20',
    )}>
      <div className="flex items-center justify-between h-16 px-4 border-b border-border">
        {expanded ? (
          <Link href="/" className="font-semibold text-xl">
            <Image src={Logo} alt="logo" className="rounded-lg" />
          </Link>
        ) : (
          <Link href="/" className="w-full flex justify-center">
            <div
              className="h-8 w-8 rounded-md bg-primary flex items-center justify-center text-primary-foreground font-bold">
              P
            </div>
          </Link>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setExpanded(!expanded)}
          className="ml-auto px-3"
        >
          {expanded ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </Button>
      </div>
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-2">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href;

            if (expanded) {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'hover:bg-muted',
                  )}
                >
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              );
            }

            return (
              <div key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'flex h-10 w-10 items-center justify-center rounded-md transition-colors mx-auto',
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'hover:bg-muted',
                  )}
                >
                  {item.icon}
                </Link>
              </div>
            );
          })}
        </nav>
      </div>
      <div className={cn(
        'border-t border-border p-4',
        expanded ? 'flex items-center' : 'flex flex-col items-center',
      )}>
        <div
          className="h-9 w-9 rounded-full bg-muted flex items-center justify-center text-muted-foreground font-medium">
          JD
        </div>
        {expanded && (
          <div className="ml-3">
            <p className="text-sm font-medium">{session?.user?.name}</p>
            {userLogged && <p className="text-xs text-muted-foreground">Admin</p>}
          </div>
        )}
      </div>
    </div>
  );
}