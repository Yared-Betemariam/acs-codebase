"use server";

import { getVerificationTokenByEmail } from "@/api/verification-token";
import connectDB from "@/mongoose/db";
import VerificationTokens from "@/mongoose/models/verification-token";
import crypto from "crypto";

// verification token generation
export const generateVerificationToken = async (email: string) => {
  await connectDB();
  const token = crypto.randomInt(100_000, 1_000_000).toString();
  const expires = new Date(Date.now() + 3600 * 1000);
  const existingToken = await getVerificationTokenByEmail(email);
  if (existingToken) {
    await VerificationTokens.deleteOne({ id: existingToken.id });
  }
  const verTokenInfo = {
    expires: expires,
    token: token,
    email: email,
  };
  const verToken = await VerificationTokens.create(verTokenInfo);
  return verToken;
};
