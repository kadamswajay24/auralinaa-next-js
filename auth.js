import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import dbConnect from './lib/db';
import User from './models/User';

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  secret: process.env.AUTH_SECRET,
  providers: [
    Credentials({
      async authorize(credentials) {
        await dbConnect();

        try {
          const user = await User.findOne({ email: credentials.email });
          
          if (!user) return null;
          
          // Simple password check (should use bcrypt in production)
          if (user.password !== credentials.password) return null;

          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role,
          };

        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    ...authConfig.callbacks,
  },
});

export const { GET, POST } = handlers;
