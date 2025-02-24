import { auth } from "@/auth";
import connectDB from "@/mongoose/db";
import Orders, { Order } from "@/mongoose/models/order";

export async function GET() {
  try {
    const session = await auth();
    if (!session || !session.user.id) {
      return Response.json(null, { status: 401 });
    }

    await connectDB();
    const userOrders = await Orders.find({
      $or: [{ buyerId: session.user.id }, { sellerId: session.user.id }],
    })
      .lean<Order[]>()
      .exec();

    return Response.json(userOrders, { status: 200 });
  } catch (error) {
    console.error("Error fetching user payments:", error);
    return Response.json(null, { status: 500 });
  }
}
