import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Account } from "@/mongoose/models/account";
import AccountForm from "../account-form";

interface Props {
  account: Account;
}

const EditAccount = ({ account }: Props) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size={"sm"}
          variant={"outline"}
          className="bg-transparent border-border/25"
        >
          <Pencil /> Edit
        </Button>
      </SheetTrigger>
      <SheetContent side={"bottom"} className="w-fit mx-auto h-[95vh] p-0">
        <SheetHeader className="p-6 space-y-0 gap-1 border-b border-border/25 h-fit max-h-[20vh]">
          <SheetTitle className="text-white">Edit account</SheetTitle>
          <SheetDescription>
            After making all neccesary changes Press Save.
          </SheetDescription>
        </SheetHeader>
        <AccountForm account={account} />
      </SheetContent>
    </Sheet>
  );
};
export default EditAccount;
