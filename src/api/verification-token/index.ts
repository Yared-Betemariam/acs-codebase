import connectDB from "@/mongoose/db";
import VerificationTokens, {
  VerificationToken,
} from "@/mongoose/models/verification-token";

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    await connectDB();
    const verificationToken = await VerificationTokens.findOne({ email })
      .lean<VerificationToken>()
      .exec();
    return verificationToken;
  } catch {
    return null;
  }
};
export const getVerificationTokenByToken = async (token: string) => {
  try {
    await connectDB();
    const verificationToken = await VerificationTokens.findOne({ token })
      .lean<VerificationToken>()
      .exec();
    return verificationToken;
  } catch {
    return null;
  }
};
