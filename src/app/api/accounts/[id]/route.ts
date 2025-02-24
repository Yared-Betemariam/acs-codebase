import connectDB from "@/mongoose/db";
import Accounts from "@/mongoose/models/account";
import Users from "@/mongoose/models/user";
import { NextApiRequest } from "next";

export async function GET(
  _: NextApiRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    await connectDB();
    const account = await Accounts.findById(id).exec();
    const owner = await Users.findById(account?.userId)
      .select("username imageUrl")
      .exec();

    return Response.json(
      {
        account,
        owner,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching user payments:", error);
    return Response.json(null, { status: 500 });
  }
}
