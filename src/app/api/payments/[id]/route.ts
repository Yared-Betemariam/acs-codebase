import { auth } from "@/auth";
import connectDB from "@/mongoose/db";
import PaymentInfos from "@/mongoose/models/payment-info";
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
    const paymentInfo = await PaymentInfos.findById(id).exec();

    if (paymentInfo && String(paymentInfo.userId) === session.user.id) {
      return Response.json(paymentInfo, { status: 200 });
    }

    return Response.json(null, { status: 401 });
  } catch (error) {
    console.error("Error fetching user payments:", error);
    return Response.json(null, { status: 500 });
  }
}
