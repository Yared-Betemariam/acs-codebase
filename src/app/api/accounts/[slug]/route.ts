import { auth } from "@/auth"; // Use the new auth function
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({ message: "Protected data", user: session.user });
}
