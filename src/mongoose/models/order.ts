import mongoose, { Document, Model } from "mongoose";

export interface Order extends Document {
  accountId: mongoose.Schema.Types.ObjectId;
  price: number;
  status: "ongoing" | "refunded" | "acquired";
  buyerId: mongoose.Schema.Types.ObjectId;
  sellerId: mongoose.Schema.Types.ObjectId;
  paymentStatus: "buyer" | "escrow" | "seller";
  createdAt: Date;
}

const orderSchema = new mongoose.Schema<Order>(
  {
    accountId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["ongoing", "refunded", "acquired"],
      required: true,
    },
    buyerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["buyer", "escrow", "seller"],
      required: true,
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

const Orders: Model<Order> =
  mongoose.models?.Order || mongoose.model("Order", orderSchema);

export default Orders;
