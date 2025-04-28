'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BarChart2, ChevronLeft, ChevronRight, Home, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';
import { filterNavigationByAccess } from '@/lib/permissions';
import { navigationItems } from '@/lib/navigation';

interface SidebarItem {
  title: string;
  href: string;
  icon: React.ReactNode;
}

const sidebarItems: SidebarItem[] = [
  { title: 'Dashboard', href: '/dashboard', icon: <Home size={20} /> },
  { title: 'Analytics', href: '/dashboard/analytics', icon: <BarChart2 size={20} /> },
  { title: 'Customers', href: '/dashboard/customers', icon: <Users size={20} /> },
  // { title: 'Products', href: '/dashboard/products', icon: <ShoppingCart size={20} /> },
  // { title: 'Projects', href: '/dashboard/projects', icon: <FolderClosed size={20} /> },
  // { title: 'Calendar', href: '/dashboard/calendar', icon: <Calendar size={20} /> },
  // { title: 'Messages', href: '/dashboard/messages', icon: <MessageSquare size={20} /> },
  // { title: 'Settings', href: '/dashboard/settings', icon: <Settings size={20} /> },
];

export function Sidebar() {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(true);
  const { data: session, status } = useSession();
  const userLogged = status === 'authenticated';
  // @ts-expect-error error expected
  const items = filterNavigationByAccess(session, navigationItems);

  return (
    <div className={cn(
      'flex flex-col h-screen border-r border-border bg-card transition-all duration-300',
      expanded ? 'w-64' : 'w-16',
    )}>
      <div className="flex items-center justify-between h-16 px-4 border-b border-border">
        {expanded ? (
          <Link href="/dashboard" className="font-semibold text-xl">
            Dash<span className="text-primary">Board</span>
          </Link>
        ) : (
          <Link href="/dashboard" className="w-full flex justify-center">
            <div
              className="h-8 w-8 rounded-md bg-primary flex items-center justify-center text-primary-foreground font-bold">
              D
            </div>
          </Link>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setExpanded(!expanded)}
          className="ml-auto"
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
                  {/*{item.icon}*/}
                  <span>{item.title}</span>
                  {item.title === 'Messages' && (
                    <span
                      className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                      5
                    </span>
                  )}
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
                  {/*{item.icon}*/}
                  {item.title === 'Messages' && (
                    <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-primary" />
                  )}
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