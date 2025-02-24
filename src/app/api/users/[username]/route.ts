import connectDB from "@/mongoose/db";
import Accounts, { Account } from "@/mongoose/models/account";
import Users, { User } from "@/mongoose/models/user";
import { NextApiRequest } from "next";

export async function GET(
  _: NextApiRequest,
  { params }: { params: Promise<{ username: string }> }
) {
  const { username } = await params;
  try {
    await connectDB();
    const user = await Users.findOne({ username })
      .select("username imageUrl")
      .lean<User>()
      .exec();

    if (!user) {
      return Response.json(null, { status: 404 });
    }
    const accounts = await Accounts.find({ userId: user?._id })
      .lean<Account[]>()
      .exec();

    return Response.json(
      {
        user,
        accounts,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching user payments:", error);
    return Response.json(null, { status: 500 });
  }
}
