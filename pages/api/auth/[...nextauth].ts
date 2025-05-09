// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import NextAuth, { Awaitable, NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { fetchApi } from '@/lib/fetchApi';
import { Session } from 'next-auth';
import { apiRoutes } from '@/lib/routes';
import { User } from '@/types/user';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const res: User = await fetchApi(apiRoutes.login, {
          method: 'POST',
          body: credentials,
        });

        if (res.token) {
          return {
            token: res.token,
            name: 'Agu',
            modules: ['companies:read', 'modules:read', 'users:read', 'configurations:read'],
          } as Awaitable<User | null>;
        } else
          return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: Session; user: User }) {
      if (user) {
        token.accessToken = user.token;
        token.user = user;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: Session }) {
      session.user = token.user;
      session.accessToken = token.accessToken;
      return session;
    },
  },
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
};

// @ts-expect-error expected error 
export default NextAuth(authOptions);
