import { getServerSession } from 'next-auth/next';
import { NextRequest } from 'next/server';
import { Session } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

type HandlerWithToken = (
  req: NextRequest,
  ctx: { accessToken: string },
) => Promise<Response>;

export function withAuthToken(handler: HandlerWithToken) {
  return async (req: NextRequest) => {
    const session: Session | null = await getServerSession(authOptions);

    const token = session?.accessToken;

    if (!token) {
      return new Response('Unauthorized', { status: 401 });
    }

    return handler(req, { accessToken: token });
  };
}
