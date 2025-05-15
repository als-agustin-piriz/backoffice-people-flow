import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/providers/theme-provider';
import ClientSessionProvider from '@/components/providers/ClientSessionProvider';
import { getServerSession } from 'next-auth/next';
import type { Session } from 'next-auth';
import { ProviderHeroUi } from '@/providers/heroui-provider';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Backoffice PeopleFlow',
  description: 'Configurations',
};

export default async function RootLayout(
  {
    children,
  }: {
    children: React.ReactNode;
  }) {
  const session: Session | null = await getServerSession(authOptions);

  return (
    <html lang="en" suppressHydrationWarning>
    <body className={inter.className}>
    <ClientSessionProvider session={session}>
      <ProviderHeroUi>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </ProviderHeroUi>
    </ClientSessionProvider>
    </body>
    </html>
  );
}
