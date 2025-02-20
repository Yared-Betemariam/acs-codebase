import { auth } from "@/auth";
import connectDB from "@/mongoose/db";
import Accounts, { Account } from "@/mongoose/models/account";

export async function GET() {
  try {
    const session = await auth();
    if (!session || !session.user.id) {
      return Response.json(null, { status: 401 });
    }

    await connectDB();
    const userAccounts = await Accounts.find({ userId: session.user.id })
      .lean<Account[]>()
      .exec();

    return Response.json(userAccounts, { status: 200 });
  } catch (error) {
    console.error("Error fetching user payments:", error);
    return Response.json(null, { status: 500 });
  }
}
