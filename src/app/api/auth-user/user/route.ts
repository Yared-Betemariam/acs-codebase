import { getUserByEmail } from "@/api/user";
import connectDB from "@/mongoose/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const searchParams = req.nextUrl.searchParams;

    const query = searchParams.get("email") as string;
    await connectDB();

    const user = await getUserByEmail(query);
    return NextResponse.json(user);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "something went wrong" },
      { status: 500 }
    );
  }
};
