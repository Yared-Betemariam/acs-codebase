"use client";

import AccountCard from "@/components/account/account-card";
import FormError from "@/components/ui/FormError";
import Loading from "@/components/ui/loading";
import { useCurrentUser } from "@/features/auth/hooks";
import CreateAccount from "@/features/sell/components/create-account";
import { useUserAccountsStore } from "@/features/sell/store";
import { useEffect } from "react";

const SellPage = () => {
  const { loadAccounts, accounts } = useUserAccountsStore();
  const { user, isLoading } = useCurrentUser();

  useEffect(() => {
    loadAccounts();
  }, []);

  return (
    <main className="wrapper pt-28 pb-14 flex flex-1 flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="h1">Sell accounts</h1>
        <CreateAccount />
      </div>
      <div className="rounded-lg border border-border/25 p-4 flex-1 flex flex-wrap gap-6">
        {accounts === undefined || isLoading ? (
          <Loading text="Loading your accounts" />
        ) : accounts === null ? (
          <FormError message="Something went wrong! Refresh the page and try again" />
        ) : accounts.length === 0 ? (
          <p>You don&apos;t seem to have any accounts posted</p>
        ) : (
          accounts.map((account) => (
            <AccountCard
              account={account}
              key={String(account._id)}
              editable={String(account.userId) == String(user?.id)}
              Edit={<></>}
            />
          ))
        )}
      </div>
    </main>
  );
};

export default SellPage;
