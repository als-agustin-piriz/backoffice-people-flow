import { DashboardLayout } from '@/components/dashboard/layout';

export const metadata = {
  title: 'Dashboard - Next.js Admin',
  description: 'A modern dashboard built with Next.js and shadcn/ui',
};

export default function Layout({
                                 children,
                               }: {
  children: React.ReactNode;
}) {
  return (
    <DashboardLayout title="Dashboard">
      {children}
    </DashboardLayout>
  );
}