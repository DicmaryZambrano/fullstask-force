import type { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      role?: 'customer' | 'seller';
    } & DefaultSession['user'];
  }

  interface User {
    role?: 'customer' | 'seller';
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role?: 'customer' | 'seller';
  }
}
