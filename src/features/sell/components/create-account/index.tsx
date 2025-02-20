import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import AccountForm from "../account-form";

const CreateAccount = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size={"sm"} className="text-sm">
          <PlusCircle /> Create Account
        </Button>
      </SheetTrigger>
      <SheetContent
        side={"bottom"}
        className="max-w-4xl w-full mx-auto h-[95vh] p-0"
      >
        <SheetHeader className="p-6 border-b border-border/25">
          <SheetTitle className="text-white">Create a new account</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </SheetDescription>
        </SheetHeader>
        <AccountForm />
      </SheetContent>
    </Sheet>
  );
};
export default CreateAccount;
