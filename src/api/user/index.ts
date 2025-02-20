"use server";

import connectDB from "@/mongoose/db";
import Users, { User } from "@/mongoose/models/user";

export const getUserByEmail = async (email: string) => {
  try {
    await connectDB();
    const user = await Users.findOne({ email }).lean<User>().exec();
    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    await connectDB();
    const user = await Users.findById(id).lean<User>().exec();
    return user;
  } catch {
    return null;
  }
};
