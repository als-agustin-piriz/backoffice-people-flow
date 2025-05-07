// @ts-expect-error error expected
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { fetchApi } from '@/lib/fetchApi';
import { apiRoutes } from '@/lib/routes';

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            credentials: {
                email: {},
                password: {},
            },
          // @ts-expect-error expected
          async authorize(credentials) {
            const res = await fetchApi(apiRoutes.login, {
              method: 'POST',
              body: credentials,
            });

            if (res.token) {
              return {
                token: res.token,
                name: 'Agu',
                modules: ['companies:read', 'modules:read', 'users:read', 'configurations:read'],
              };
            } else
                return null;
            }
        }),
    ],
    callbacks: {
        async jwt({token, user}) {
            if (user) {
                token.accessToken = user.token;
                token.user = user;
            }
            return token;
        },
        async session({session, token}) {
            session.user = token.user;
            session.accessToken = token.accessToken;
            return session;
        },
    },
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/login",
    },
};

// @ts-ignore
export default NextAuth(authOptions);
