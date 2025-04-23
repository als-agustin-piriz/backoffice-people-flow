// app/layout.tsx (o cualquier layout server component)
import './globals.css';
import type {Metadata} from 'next';
import {Inter} from 'next/font/google';
import {ThemeProvider} from '@/providers/theme-provider';
import {getServerSession} from 'next-auth';
import {authOptions} from '@/pages/api/auth/[...nextauth]';
import ClientSessionProvider from "@/components/providers/ClientSessionProvider";

const inter = Inter({subsets: ['latin']});

export const metadata: Metadata = {
    title: 'Dashboard - Next.js Admin',
    description: 'A modern dashboard built with Next.js and shadcn/ui',
};

export default async function RootLayout({
                                             children,
                                         }: {
    children: React.ReactNode;
}) {
    const session = await getServerSession(authOptions);

    return (
        <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
        <ClientSessionProvider session={session}>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                {children}
            </ThemeProvider>
        </ClientSessionProvider>
        </body>
        </html>
    );
}
