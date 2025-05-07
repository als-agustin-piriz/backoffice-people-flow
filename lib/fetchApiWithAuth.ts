import { Session } from 'next-auth';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

export async function fetchApiWithAuth(
  url: string,
  options: {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE',
    body?: any,
  } = {},
): Promise<Response> {
  const { method = 'GET', body } = options;

  const session: Session | null = await getServerSession(authOptions);

  const token = session?.accessToken;

  if (!token) {
    return new Response('Unauthorized', { status: 401 });
  }

  const res = await fetch(url, {
    method,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`API error: ${res.status} - ${errText}`);
  }

  return res.json();
}
