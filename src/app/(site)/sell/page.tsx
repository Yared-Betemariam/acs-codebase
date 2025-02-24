"use client";

import AccountCard from "@/components/account/account-card";
import Empty from "@/components/ui/empty";
import FormError from "@/components/ui/FormError";
import FormWarning from "@/components/ui/FormWarning";
import Loading from "@/components/ui/loading";
import { useCurrentUser } from "@/features/auth/hooks";
import CreateAccount from "@/features/sell/components/create-account";
import { useUserAccountsStore } from "@/features/sell/store";
import { useUserAccountCompletion } from "@/features/settings/hooks";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

const SellPage = () => {
  const { loadAccounts, accounts, setAccounts } = useUserAccountsStore();
  const { user, isLoading } = useCurrentUser();
  const accountCompletion = useUserAccountCompletion();

  useEffect(() => {
    if (!accounts) {
      loadAccounts();
    }
  }, []);

  return (
    <main className="wrapper pt-28 pb-14 flex flex-1 flex-col gap-4">
      <div className="flex flex-col md:flex-row items-start gap-2 md:items-center justify-between">
        <h1 className="h1">Sell accounts</h1>
        <CreateAccount />
      </div>
      {accountCompletion && accountCompletion.percent < 100 && (
        <FormWarning message="Finish setting up you account first before you start selling accounts." />
      )}
      <div
        className={cn(
          "rounded-lg border border-border/25 p-4 flex-1 ",
          accounts?.length && accounts.length > 0
            ? "grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-3"
            : "flex"
        )}
      >
        {accounts === undefined || isLoading ? (
          <Loading text="Loading your accounts" center />
        ) : accounts === null ? (
          <FormError
            skeleton
            message="Something went wrong! Refresh the page and try again"
          />
        ) : accounts.length === 0 ? (
          <Empty text="You don't seem to have any accounts posted" center />
        ) : (
          accounts.map((account) => (
            <AccountCard
              onDelete={() => {
                if (accounts) {
                  setAccounts(
                    accounts.filter(
                      (accountItem) => account._id !== accountItem._id
                    )
                  );
                }
              }}
              account={account}
              key={String(account._id)}
              editable={String(account.userId) == String(user?.id)}
            />
          ))
        )}
      </div>
    </main>
  );
};

export default SellPage;
