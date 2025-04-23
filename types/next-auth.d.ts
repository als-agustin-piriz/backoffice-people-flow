
declare module 'next-auth' {
  interface Session {
    accessToken: string;
    user: {
      name: string;
      email: string;
      modules: string[];
    };
  }

  interface JWT {
    accessToken: string;
    user: {
      name: string;
      email: string;
      modules: string[];
    };
  }
}