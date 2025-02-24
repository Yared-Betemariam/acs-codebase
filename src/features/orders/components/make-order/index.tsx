import { useOrderDialogStore } from "@/components/modals/store";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/features/auth/hooks";
import { Account } from "@/mongoose/models/account";
import { useRouter } from "next/navigation";

interface Props {
  account: Account;
}

const MakeOrder = ({ account }: Props) => {
  const { user, isLoading } = useCurrentUser();
  const router = useRouter();
  const handleOrder = () => {
    if (user) {
      useOrderDialogStore.getState().openDialog(account);
    } else {
      router.push("/auth/sign-in");
    }
  };

  if (isLoading) {
    return null;
  }

  return (
    <>
      <Button
        disabled={user?.id === String(account.userId)}
        onClick={handleOrder}
        className="w-full text-base py-6"
      >
        Make Order
      </Button>
    </>
  );
};
export default MakeOrder;
