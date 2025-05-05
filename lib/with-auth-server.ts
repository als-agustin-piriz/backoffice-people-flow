import { getServerSession } from 'next-auth/next';
import { hasAnyAccess } from '@/lib/permissions';
import { redirect } from 'next/navigation';
import { Session } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

export async function withAuthServer(
  module: string[],
  component: () => Promise<JSX.Element>,
) {
  const session: Session | null = await getServerSession(authOptions);

  if (!session || !hasAnyAccess(session, module)) {
    redirect('/unauthorized');
  }

  return component();
}
