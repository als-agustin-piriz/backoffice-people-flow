import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

export async function fetchWithAuth(
  input: RequestInfo | URL,
  init?: RequestInit,
) {
  const session = await getServerSession(authOptions);

  if (!session?.accessToken) {
    throw new Error('No access token found in session');
  }

  return fetch(input, {
    ...init,
    headers: {
      ...(init?.headers || {}),
      Authorization: `Bearer ${session.accessToken}`,
    },
  });
}
