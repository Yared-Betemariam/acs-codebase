"use client";

import { Badge } from "@/components/ui/badge";
import Loading from "@/components/ui/loading";
import { useEffect, useState } from "react";

import FormError from "@/components/ui/FormError";
import { Order } from "@/mongoose/models/order";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Empty from "@/components/ui/empty";

const OrdersPage = () => {
  const [data, setData] = useState<Order[] | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(`/api/orders/user`)
      .then((response) => response.json())
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  return (
    <main className="wrapper pt-28 pb-14 flex flex-1 flex-col gap-4">
      <h1 className="h1">Orders</h1>
      <span className="opacity-75">{data ? data.length : 0} orders found</span>
      <div className="flex flex-1 flex-col">
        <div className="p-4 rounded-lg flex-1 flex flex-wrap gap-4">
          {loading ? (
            <Loading text="Loading your orders" center />
          ) : data === null ? (
            <FormError
              skeleton
              message="Something went wrong! Refresh the page and try again"
            />
          ) : data.length === 0 ? (
            <Empty text="You don't have any orders yet!" center />
          ) : (
            data.map((order) => (
              <OrderRow key={String(order._id)} order={order} />
            ))
          )}
        </div>
      </div>
    </main>
  );
};

interface OrderRowProps {
  order: Order;
}

function OrderRow({ order }: OrderRowProps) {
  // Function to truncate IDs for better display
  const truncateId = (id: string) => `${id.slice(0, 6)}...${id.slice(-4)}`;

  return (
    <div className="w-full flex items-center justify-between gap-4 p-4 border border-border/25 rounded-lg transition-colors">
      {/* Order ID */}
      <div className="w-32 lg:w-40">
        <span className="text-muted-foreground text-sm">Id</span>
        <p className="text-sm font-medium ">{truncateId(String(order._id))}</p>
      </div>

      {/* Price */}
      <div className="w-24 text-right">
        <span className="text-muted-foreground text-sm">Price</span>
        <p className="font-medium">${order.price.toFixed(2)}</p>
      </div>

      {/* Status */}
      <div className="w-24">
        <span className="text-muted-foreground text-sm">Status</span>
        <Badge
          variant={order.status !== "ongoing" ? "default" : "secondary"}
          className="capitalize"
        >
          {order.status}
        </Badge>
      </div>

      {/* Payment Status */}
      <div className="w-24">
        <span className="text-muted-foreground text-sm">Money with</span>
        <Badge
          variant="outline"
          className="capitalize border border-border/10 text-white"
        >
          {order.paymentStatus}
        </Badge>
      </div>

      {/* Buyer ID */}
      <div className="hidden lg:flex w-28 items-center justify-center">
        <Link
          href={`/orders/${String(order._id)}`}
          className={cn(
            "flex items-center text-sm brightness-125 text-primary hover:underline hover:opacity-80 duration-300 transition-all"
          )}
        >
          <span>More details</span>
          <ChevronRight className="size-6" />
        </Link>
      </div>
    </div>
  );
}

export default OrdersPage;
