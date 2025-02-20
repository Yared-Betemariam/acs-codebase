import mongoose, { Document, Model } from "mongoose";

export interface Review extends Document {
  star: number;
  message: string;
  to: mongoose.Schema.Types.ObjectId;
  from: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
}

const reviewSchema = new mongoose.Schema<Review>({});

const Reviews: Model<Review> =
  mongoose.models?.Review || mongoose.model("Review", reviewSchema);

export default Reviews;
