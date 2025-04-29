import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { hasAnyAccess } from '@/lib/permissions';

export default async function CompaniesLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session || !hasAnyAccess(session, ['companies:read'])) {
    redirect('/unauthorized');
  }

  return <>{children}</>;
}