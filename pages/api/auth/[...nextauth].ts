// @ts-expect-error error expected
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            credentials: {
                email: {},
                password: {},
            },
            // @ts-expect-error expected
            async authorize(credentials) {
                // const res = await fetch("https://tu-api.com/login", {
                //     method: "POST",
                //     headers: { "Content-Type": "application/json" },
                //     body: JSON.stringify(credentials),
                // });

                // const user = await res.json();

                const res = {
                    ok: true,
                }
                const user = {
                    ok: true,
                    token: 'faketoken',
                    name: 'Agu',
                  modules: ['companies:read', 'modules:read', 'users:read', 'configurations:read'],
                }

                console.log('res', credentials);

                if (res.ok && user) {
                    return user;
                }

                return null;
            }
        }),
        // GoogleProvider
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
