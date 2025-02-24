"use client";

import { useEffect } from "react";
import { useAccountsStore } from "../../store";
import Loading from "@/components/ui/loading";
import FormError from "@/components/ui/FormError";
import AccountCard from "@/components/account/account-card";
import Empty from "@/components/ui/empty";

interface Props {
  name: string;
}

const AccountList = ({ name }: Props) => {
  const { accounts, loadAccounts } = useAccountsStore();

  useEffect(() => {
    loadAccounts();
  }, []);

  return (
    <div className="flex-1 grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-3">
      <span className="sr-only">{name}</span>
      {accounts === undefined ? (
        <Loading text="Loading your accounts" center />
      ) : accounts === null ? (
        <FormError
          skeleton
          message="Something went wrong! Refresh the page and try again"
        />
      ) : accounts.length === 0 ? (
        <Empty text="No accounts for sale, today! Try again tomorrow" center />
      ) : (
        accounts.map((account) => (
          <AccountCard account={account} key={String(account._id)} />
        ))
      )}
    </div>
  );
};

export default AccountList;
