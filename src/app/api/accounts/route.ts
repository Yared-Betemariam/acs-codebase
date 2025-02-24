import connectDB from "@/mongoose/db";
import Accounts, { Account } from "@/mongoose/models/account";

export async function GET() {
  try {
    await connectDB();
    const userAccounts = await Accounts.find().lean<Account[]>().exec();

    return Response.json(userAccounts, { status: 200 });
  } catch (error) {
    console.error("Error fetching user payments:", error);
    return Response.json(null, { status: 500 });
  }
}
