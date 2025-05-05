
declare module 'next-auth' {
  interface Session {
    accessToken: string;
    user: {
      name: string;
      email: string;
      modules: string[];
    };
  }
}