"use client";

import Loading from "@/components/ui/loading";
import { Account } from "@/mongoose/models/account";
import { User } from "@/mongoose/models/user";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { ChevronLeft } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

import Error from "@/components/ui/error";
import { useCurrentUser } from "@/features/auth/hooks";
import { MessageComponent } from "@/features/message/components/message-form";
import { Order } from "@/mongoose/models/order";

const Page = () => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<{
    order?: Order;
    account?: Account;
    seller?: User;
    buyer?: User;
  } | null>(null);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const { user, isLoading } = useCurrentUser();

  useEffect(() => {
    if (id) {
      fetch(`/api/orders/${id}`)
        .then((response) => response.json())
        .then((result) => {
          setData(result);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading || isLoading) {
    return <Loading text="Loading order info" center />;
  }

  if (data === null) {
    return <Error center text="Order not found!" />;
  }

  if (!user || !user.id) {
    return <Error center text="Not authorized!" />;
  }

  const { account, order, buyer, seller } = data;
  if (!account || !order || !buyer || !seller) {
    return <Error text="Data didn't Load, Refresh the page!" center />;
  }

  const isBuyer = user.id === data.order?.buyerId?.toString() ? true : false;
  const otherParty = isBuyer ? data.seller : data.buyer;

  return (
    <main className="wrapper pt-28 pb-14 flex flex-1 flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="h1">Order</h1>
        <span
          onClick={() => router.back()}
          className="text-sm hover:underline hover:opacity-50 duration-300 transition-all flex items-center cursor-pointer"
        >
          <ChevronLeft className="size-6" /> <span>Back</span>
        </span>
      </div>
      <div className="flex flex-col md:flex-row w-full">
        <div className="w-full grid gap-6 grid-cols-2">
          <div className="space-y-6">
            <div className="border border-border/25 rounded-lg">
              <CardHeader>
                <CardTitle>Account Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Title</Label>
                    <div className="font-medium">{data.account?.title}</div>
                  </div>
                  <div>
                    <Label>Type</Label>
                    <div className="font-medium uppercase">
                      {data.account?.type}
                    </div>
                  </div>
                  <div>
                    <Label>Level</Label>
                    <div className="font-medium">{data.account?.level}</div>
                  </div>
                  <div>
                    <Label>Price</Label>
                    <div className="font-medium">${data.account?.price}</div>
                  </div>
                </div>
                <div>
                  <Label>Description</Label>
                  <div className="mt-1 text-muted-foreground">
                    {data.account?.description}
                  </div>
                </div>
                <div>
                  <Label>{isBuyer ? "Seller" : "Buyer"}</Label>
                  <div className="font-medium">{otherParty?.username}</div>
                </div>
                <Separator />
                <div className="grid grid-cols-2">
                  <div>
                    <Label>Order Status</Label>
                    <div className="font-medium capitalize">
                      {data.order?.status}
                    </div>
                  </div>
                  <div>
                    <Label>Payment Status</Label>
                    <div className="font-medium capitalize">
                      {data.order?.paymentStatus}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  {isBuyer && (
                    <>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button size="sm" variant="destructive">
                            Request Refund
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Request a Refund
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to request a refund? This
                              action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction>Continue</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>

                      <Button size="sm">Confirm Receipt</Button>
                    </>
                  )}
                </div>
              </CardContent>
            </div>
          </div>

          {user.id && otherParty?._id ? (
            <div className="space-y-6">
              <MessageComponent
                currentUserId={user.id}
                partnerUserId={String(otherParty._id)}
              />
            </div>
          ) : null}
        </div>
      </div>
    </main>
  );
};

export default Page;
