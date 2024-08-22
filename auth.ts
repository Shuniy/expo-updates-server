import NextAuth from "next-auth";
import "next-auth/jwt";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "./common/firebase";

const config = {
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      authorize: async (credentials) => {
        try {
          const data = await signInWithEmailAndPassword(
            firebaseAuth,
            (credentials.email ?? "") as string,
            (credentials.password ?? "") as string,
          );
          if (data.user) {
            return data.user;
          } else {
            return null;
          }
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
  ],
  callbacks: {},
  debug: process.env.NODE_ENV !== "production" ? true : false,
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);

declare module "next-auth" {
  interface Session {
    accessToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
  }
}
