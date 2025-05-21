'use client';
import { Sidebar } from '@/components/dashboard/sidebar';
import { Header } from '@/components/dashboard/header';
import { useSession } from 'next-auth/react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

// @ts-expect-error expected
export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { status } = useSession();
  const userLogged = status === 'authenticated';

  if (userLogged) {
    return (
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header sidebarExpanded />
          <main className="flex-1 overflow-y-auto p-6">
            {children}
          </main>
        </div>
      </div>
    );
  }

}