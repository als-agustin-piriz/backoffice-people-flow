import { DashboardLayout } from '@/components/dashboard/layout';

export default async function SiteLayout(
  {
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
