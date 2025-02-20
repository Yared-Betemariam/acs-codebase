import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { getUserByEmailAPI } from "./api/handlers";

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth({
  session: { strategy: "jwt" },
  callbacks: {
    async session({ token, session }) {
      if (token.sub && session.user && token.username) {
        session.user.id = token.sub;
        session.user.username = token.username as string;
        session.user.paymentInfoId = token.paymentInfoId as string;
      }
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      try {
        const user = await getUserByEmailAPI(token.email as string);
        if (!user) return token;

        token.sub = String(user._id);
        token.username = user.username;
        token.paymentInfoId = user.paymentInfoId;

        return token;
      } catch (error) {
        console.log(error);
        return token;
      }
    },
  },
  pages: {
    signIn: "/auth/sign-in",
    error: "/auth/error",
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const user = await getUserByEmailAPI(credentials.email as string);
        return user;
      },
    }),
  ],
});
