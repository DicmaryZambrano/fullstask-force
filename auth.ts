import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { getUSerByEmail } from './database/database';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import type { JWT } from 'next-auth/jwt';
import type { Session, User } from 'next-auth';

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;

          const user = await getUSerByEmail(email);
          if (!user) return null;
          const passwordsMatch = await bcrypt.compare(
            password,
            user.hashed_password
          );

          if (passwordsMatch)
            return {
              id: user.id,
              name: `${user.first_name} ${user.last_name}`,
              email: user.email,
              image: user.profile_picture_url,
              role: user.role,
            };
        }

        console.log('Invalid credentials');
        return null;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        token.role = user.role;
        token.name = user.name;
        token.picture = user.image;
      }
      return token;
    },

    async session({ session, token }: { session: Session; token: JWT }) {
      if (token?.role) {
        session.user.role = token.role;
      }
      if (token?.name) {
        session.user.name = token.name;
      }
      if (token?.picture) {
        session.user.image = token.picture;
      }
      return session;
    },
  },
});
