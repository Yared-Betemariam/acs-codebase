import Card from "@/components/buy/Card";
import { CardInfo } from "@/types";

const BuyPage = () => {
  const cardInfo = {
    images: ["/pubg.png"],
    description:
      "i have different evo guns each and free diamonds  the way ony you can get to this is buy purchasing the sell the buty car got to tdifferent ",
    genre: "pubg",
    price: 20000,
    id: "da89sdf8as98df",
  } as CardInfo;
  return (
    <main className="py-40 wrapper flex flex-col gap-8">
      <h1 className="h1">Buy accounts</h1>
      <div className="flex items-center gap-8 overflow-x-scroll p-4 rounded-xl bg-zinc-100/10">
        <Card cardInfo={cardInfo} />
        <Card cardInfo={cardInfo} />
        <Card cardInfo={cardInfo} />
        <Card cardInfo={cardInfo} />
        <Card cardInfo={cardInfo} />
        <Card cardInfo={cardInfo} />
      </div>
    </main>
  );
};

export default BuyPage;
