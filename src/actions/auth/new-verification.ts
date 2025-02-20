"use server";

import { getVerificationTokenByToken } from "@/api/verification-token";
import { signIn } from "@/auth";
import connectDB from "@/mongoose/db";
import VerificationTokens from "@/mongoose/models/verification-token";
import { AuthError } from "next-auth";

export const newVerification = async (token: string) => {
  try {
    await connectDB();
    const existingToken = await getVerificationTokenByToken(token);
    if (!existingToken) {
      return {
        error: "Invalid token!",
      };
    }

    const hasExpired = new Date(existingToken.expires) < new Date();
    if (hasExpired)
      return {
        error: "Token has expired!",
      };

    await VerificationTokens.deleteOne({ id: existingToken.id });

    await signIn("credentials", {
      email: existingToken.email,
      redirect: false,
    });

    return { redirect: true };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid token" };
        default:
          return {
            error: "Something went wrong",
          };
      }
    }
    throw error;
  }
};
