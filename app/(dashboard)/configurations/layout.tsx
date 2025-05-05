import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { hasAnyAccess } from '@/lib/permissions';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

export default async function ConfigurationsLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session || !hasAnyAccess(session, ['configuration:read'])) {
    redirect('/unauthorized');
  }

  return <>{children}</>;
}