import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { getUserByEmail } from './database/database';
import { signInSchema } from './lib/zod';
import { ZodError } from 'zod';
import bcrypt from 'bcryptjs';
import { getUserById } from '@/database/database';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          const { email, password } = await signInSchema.parseAsync(
            credentials
          );

          const user = await getUserByEmail(email);

          if (!user) {
            return null;
          }

          const isPassValid = await bcrypt.compare(
            password,
            user.hashed_password
          );

          if (!isPassValid) {
            return null;
          }

          return {
            id: user.id,
            name: `${user.first_name} ${user.last_name}`,
            email: user.email,
            image: user.profile_picture_url,
          };
        } catch (error) {
          if (error instanceof ZodError) {
            return null;
          }

          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },

    async session({ session, token }) {
      if (token && session.user) {
        const user = await getUserById(token.id as string);

        if (user) {
          session.user.id = user.id;
          session.user.name = `${user.first_name} ${user.last_name}`;
          session.user.email = user.email;
          session.user.image = user.profile_picture_url;
        }
      }
      return session;
    },
  },
});
