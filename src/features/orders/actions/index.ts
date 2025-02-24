"use server";

import { auth } from "@/auth";
import connectDB from "@/mongoose/db";
import { Account } from "@/mongoose/models/account";
import Orders from "@/mongoose/models/order";

export const make_order = async (account: Account) => {
  try {
    const session = await auth();
    if (!session) {
      return { error: "Unauthorized", success: undefined };
    }

    if (String(account.userId) === session.user.id) {
      return { error: "You can't order you own accounts!" };
    }

    await connectDB();
    const order = await Orders.findOne({
      accountId: account._id,
    }).exec();
    if (order) {
      return { error: "An order has already been made to this account" };
    }

    await Orders.create({
      price: account.price,
      accountId: account._id,
      buyerId: session.user.id,
      sellerId: account.userId,
      status: "ongoing",
      paymentStatus: "buyer",
    });

    return { success: "Order made!" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong, Try again" };
  }
};
