"use client";

import Loading from "@/components/ui/loading";
import { Account } from "@/mongoose/models/account";
import { User } from "@/mongoose/models/user";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { ChevronLeft } from "lucide-react";

import AccountCard from "@/components/account/account-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Error from "@/components/ui/error";

const Page = () => {
  const { username } = useParams<{ username: string }>();
  const [data, setData] = useState<{
    accounts?: Account[];
    user?: User;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (username) {
      fetch(`/api/users/${username}`)
        .then((response) => response.json())
        .then((result) => {
          setData(result);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setLoading(false);
        });
    }
  }, [username]);

  if (loading) {
    return <Loading text="Loading account info" center />;
  }

  if (data === null) {
    return <Error center text="User not found!" />;
  }

  const { accounts, user } = data;
  if (accounts == undefined || !user) {
    return <Error text="Data didn't Load, Refresh the page!" center />;
  }

  return (
    <main className="wrapper pt-28 pb-14 flex flex-1 flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="h1">User</h1>
        <span
          onClick={() => router.back()}
          className="text-sm hover:underline hover:opacity-50 duration-300 transition-all flex items-center cursor-pointer"
        >
          <ChevronLeft className="size-6" /> <span>Back</span>
        </span>
      </div>
      <section className="flex flex-1 w-full gap-12">
        <div className="flex flex-col border border-border/25 rounded-lg p-8 flex-1">
          <div className="flex flex-col w-full items-center gap-4">
            <Avatar className="size-24">
              <AvatarImage src={user.imageUrl} />
              <AvatarFallback className="text-4xl uppercase">
                {user.username && user.username[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col text-center">
              <p className="opacity-75">Owner</p>
              <p className="text-4xl">{user.username}</p>
            </div>
          </div>
        </div>
        <div className="flex-1 w-full flex flex-col max-w-[60%]">
          <p className="text-xl">
            Accounts for sale by &quot;{user.username}&quot;{" "}
          </p>
          <div className="flex p-4 overflow-x-auto gap-8 bg-zinc-900">
            {accounts.length === 0 ? (
              <p>You don&apos;t seem to have any accounts posted</p>
            ) : (
              accounts.map((account) => (
                <AccountCard account={account} key={String(account._id)} />
              ))
            )}
          </div>
        </div>
      </section>
    </main>
  );
};
export default Page;
