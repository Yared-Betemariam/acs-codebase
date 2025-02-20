import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      username?: string;
      paymentInfoId?: string;
    } & DefaultSession["user"];
  }
}
