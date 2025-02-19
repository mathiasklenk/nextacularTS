import 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      name: string;
      email: string;
      image: string;
      userId: string;
      subscription?: string;
    };
  }
}
