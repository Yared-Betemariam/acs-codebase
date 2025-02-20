import mongoose, { Document, Model } from "mongoose";

export interface VerificationToken extends Document {
  email: string;
  token: string;
  expires: Date;
}

const verificationTokenSchema = new mongoose.Schema<VerificationToken>({
  email: {
    type: String,
    unique: true,
  },
  token: {
    type: String,
    unique: true,
  },
  expires: Date,
});

const VerificationTokens: Model<VerificationToken> =
  mongoose.models?.VerificationToken ||
  mongoose.model("VerificationToken", verificationTokenSchema);

export default VerificationTokens;
