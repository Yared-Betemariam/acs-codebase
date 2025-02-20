// use model with payment information

import mongoose, { Document, Model } from "mongoose";

export interface User extends Document {
  email: string;
  username: string;
  imageUrl: string;
  paymentInfoId: mongoose.Schema.Types.ObjectId;
}

const userSchema = new mongoose.Schema<User>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  paymentInfoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PaymentInfo",
  },
});

const Users: Model<User> =
  mongoose.models?.User || mongoose.model("User", userSchema);

export default Users;
