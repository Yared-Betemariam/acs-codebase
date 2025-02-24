import { auth } from "@/auth";
import connectDB from "@/mongoose/db";
import Accounts, { Account } from "@/mongoose/models/account";
import Orders, { Order } from "@/mongoose/models/order";
import Users, { User } from "@/mongoose/models/user";
import { NextApiRequest } from "next";

export async function GET(
  _: NextApiRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const session = await auth();
    if (!session || !session.user.id) {
      return Response.json(null, { status: 401 });
    }

    await connectDB();
    const order = await Orders.findById(id).lean<Order>().exec();
    const account = await Accounts.findById(order?.accountId)
      .lean<Account>()
      .exec();
    const buyer = await Users.findById(order?.buyerId)
      .select("username")
      .lean<User>()
      .exec();
    const seller = await Users.findById(order?.sellerId)
      .select("username")
      .lean<User>()
      .exec();

    return Response.json(
      {
        order,
        account,
        buyer,
        seller,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching user payments:", error);
    return Response.json(null, { status: 500 });
  }
}
