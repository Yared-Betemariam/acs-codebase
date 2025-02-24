import { accountTypeLists, accountTypes } from "@/config";
import mongoose, { Document, Model } from "mongoose";

export interface Account extends Document {
  type: accountTypes;
  title: string;
  description: string;
  images: string[];
  price: number;
  link?: string;
  pid?: string;
  level?: number;
  followers?: number;
  userId: mongoose.Schema.Types.ObjectId;
}

const accountSchema = new mongoose.Schema<Account>({
  type: {
    type: String,
    enum: accountTypeLists,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  link: {
    type: String,
    required: false,
  },
  pid: {
    type: String,
    required: false,
  },
  level: {
    type: Number,
    required: false,
  },
  followers: {
    type: Number,
    required: false,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Accounts: Model<Account> =
  mongoose.models?.Account || mongoose.model("Account", accountSchema);

export default Accounts;
