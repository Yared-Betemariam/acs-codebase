import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useConfirmationDialogStore } from "./store";
import FormSuccess from "../ui/FormSuccess";

const ConfirmationDialog = () => {
  const { title, description, isOpen, closeDialog, onClick, status, type } =
    useConfirmationDialogStore();
  if (!title || !description) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(e) => !e && closeDialog()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col px-6">
          <FormSuccess
            message={status == "success" ? "Successfully deleted" : undefined}
            skeleton
          />
          <FormSuccess
            message={status == "error" ? "Successfully deleted" : undefined}
            skeleton
          />
        </div>
        <DialogFooter>
          <Button
            type="submit"
            variant={type == "default" ? "default" : "destructive"}
            disabled={status === "loading" || status === "success"}
            onClick={() => onClick()}
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default ConfirmationDialog;
