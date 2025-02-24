import { Button, buttonVariants } from "@/components/ui/button";
import FormWarning from "@/components/ui/FormWarning";
import { paymentMethodsLabeled } from "@/config";
import { Account } from "@/mongoose/models/account";
import Image from "next/image";
import { useState, useTransition } from "react";
import { make_order } from "../../actions";
import FormError from "@/components/ui/FormError";
import FormSuccess from "@/components/ui/FormSuccess";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useOrderDialogStore } from "@/components/modals/store";

interface Props {
  account: Account;
}

const OrderForm = ({ account }: Props) => {
  const [success, setSuccess] = useState<undefined | string>();
  const [error, setError] = useState<undefined | string>();
  const [isPending, startTransition] = useTransition();
  const [done, setDone] = useState<boolean>(false);

  const orderDetails = {
    subtotal: account.price,
    // tax: 10.0,
  };

  const total = orderDetails.subtotal;
  // + orderDetails.shipping;

  const handleOrder = () => {
    setError(undefined);
    setSuccess(undefined);

    startTransition(() => {
      make_order(account)
        .then((data) => {
          setError(data?.error);
          setSuccess(data.success);

          if (data.success) {
            setDone(true);
          }
        })
        .catch(() => setError("Something went wrong!"));
    });
  };
  return (
    <div className="space-y-4 flex flex-col px-5 pb-5">
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span>${orderDetails.subtotal.toFixed(2)}</span>
        </div>
        {/* <div className="flex justify-between">
                <span className="text-muted-foreground">Tax</span>
                <span>${orderDetails.tax.toFixed(2)}</span>
              </div> */}
        <div className="border-t border-border/25 pt-2 mt-2">
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
      <div>
        <h3 className="font-semibold mb-3">Payment Methods</h3>
        <div className="space-y-3">
          {paymentMethodsLabeled.map((method, index) => (
            <div
              key={index}
              className="flex items-center justify-between px-3 border  border-border/25 rounded-lg hover:bg-accent/10 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Image
                  src={method.logo || "/placeholder.svg"}
                  width={40}
                  height={40}
                  alt={`${method.name} logo`}
                  className="w-10 h-10 object-contain"
                />
                <span className="opacity-75 text-sm">{method.name}</span>
              </div>
              <span>{method.number}</span>
            </div>
          ))}
        </div>
      </div>
      <FormWarning message="Please complete your payment to the following accounts before confirming your order." />
      <FormError message={error} skeleton />
      <FormSuccess message={success} skeleton />
      <div className="flex gap-4 w-full">
        <Link
          href={"/orders"}
          onClick={() => useOrderDialogStore.getState().closeDialog()}
          className={cn(
            buttonVariants({ variant: "outline" }),
            "bg-transparent border-border/25"
          )}
        >
          Open Orders
        </Link>
        <Button
          onClick={handleOrder}
          type="submit"
          className="flex-1"
          disabled={isPending || done}
        >
          Confirm Order
        </Button>
      </div>
    </div>
  );
};
export default OrderForm;
