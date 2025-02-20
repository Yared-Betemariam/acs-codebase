import { paymentMethodLists, paymentMethodTypes } from "@/config";
import mongoose, { Document, Model } from "mongoose";

export interface PaymentInfo extends Document {
  method: paymentMethodTypes;
  fullName: string;
  number: string;
  userId: mongoose.Schema.Types.ObjectId;
  phoneNumber: string;
}

const PaymentInfoschema = new mongoose.Schema<PaymentInfo>({
  method: {
    type: String,
    enum: paymentMethodLists,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: false,
  },
});

const PaymentInfos: Model<PaymentInfo> =
  mongoose.models?.PaymentInfo ||
  mongoose.model("PaymentInfo", PaymentInfoschema);

export default PaymentInfos;
