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
import { useUserAccountCompletion } from "@/features/settings/hooks";
import AccountForm from "../account-form";

const CreateAccount = () => {
  const accountCompletion = useUserAccountCompletion();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          disabled={!accountCompletion || accountCompletion.percent < 100}
          size={"sm"}
          className="text-sm"
        >
          <PlusCircle /> Create Account
        </Button>
      </SheetTrigger>
      <SheetContent side={"bottom"} className="w-fit mx-auto h-[95vh] p-0">
        <SheetHeader className="p-6 space-y-0 gap-1 border-b border-border/25 h-fit max-h-[20vh]">
          <SheetTitle className="text-white">Create Account</SheetTitle>
          <SheetDescription>
            Fill out all the forms and press Publish to create a new account.
          </SheetDescription>
        </SheetHeader>
        <AccountForm />
      </SheetContent>
    </Sheet>
  );
};
export default CreateAccount;
