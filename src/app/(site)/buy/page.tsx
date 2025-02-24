import AccountList from "@/features/buy/components/account-list";
import Filter from "@/features/buy/components/filter";

const BuyPage = () => {
  return (
    <main className="wrapper pt-28 pb-14 flex flex-1 flex-col gap-4">
      <h1 className="h1">Buy accounts</h1>
      <Filter />
      <AccountList name="Accounts" />
    </main>
  );
};

export default BuyPage;
