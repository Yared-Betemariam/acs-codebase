import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import OrderForm from "@/features/orders/components/order-form";
import { useOrderDialogStore } from "./store";

const OrderDialog = () => {
  const { isOpen, closeDialog, account } = useOrderDialogStore();
  if (!account) return;
  return (
    <Dialog open={isOpen} onOpenChange={(e) => !e && closeDialog()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Order Summary</DialogTitle>
          <DialogDescription className="sr-only">
            order summery of your order
          </DialogDescription>
        </DialogHeader>
        <OrderForm account={account} />
      </DialogContent>
    </Dialog>
  );
};
export default OrderDialog;
