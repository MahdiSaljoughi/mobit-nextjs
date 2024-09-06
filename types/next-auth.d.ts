import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    username: string;
    rule: string;
  }
  interface Session {
    user: User & {
      username: string;
      rule: string;
    };
    token: {
      username: string;
      rule: string;
    };
  }
}
