'use client';

import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';

export default function ClientSessionProvider({ children }: { children: React.ReactNode, session: Session }) {
  return <SessionProvider>{children}</SessionProvider>;
}
