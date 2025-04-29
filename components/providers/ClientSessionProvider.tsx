'use client';

import { SessionProvider } from 'next-auth/react';
import type { Session } from 'next-auth';

export default function ClientSessionProvider({ children }: { children: React.ReactNode, session: Session | null }) {
  return <SessionProvider>{children}</SessionProvider>;
}
