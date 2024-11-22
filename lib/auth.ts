import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";
import { compare } from "bcrypt";
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/sign-in",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        phone: {
          label: "شماره تماس",
          type: "text",
          placeholder: "0912000000",
        },
        password: { label: "رمز عبور", type: "password" },
      },
      // @ts-ignore
      async authorize(credentials) {
        if (!credentials?.phone || !credentials.password) {
          return null;
        }
        const existingUser = await prisma.user.findUnique({
          where: {
            phone: credentials.phone,
          },
        });
        if (!existingUser) {
          return null;
        }
        const passwordMatch = await compare(
          credentials.password,
          existingUser.password
        );
        if (!passwordMatch) {
          return null;
        }
        if (existingUser.role === "USER") {
          return {
            id: existingUser.id,
            email: existingUser.email,
            username: existingUser.user_name,
            role: "USER",
          };
        } else {
          return {
            id: existingUser.id,
            email: existingUser.email,
            username: existingUser.user_name,
            role: "ADMIN",
          };
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          id: user.id,
          username: user.username,
          role: user.role,
        };
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          username: token.username,
          role: token.role,
        },
      };
    },
  },
};

export default NextAuth(authOptions);
