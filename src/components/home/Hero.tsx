import Link from "next/link";
import { Button } from "../ui/button";

const HeroSection = () => {
  return (
    <section className="wrapper flex flex-col md:flex-row justify-center items-center mt-16">
      <div className="flex flex-col py-24 items-center text-center gap-8 md:max-w-[60%]">
        <h1 className="text-7xl font-bold">
          Buy & Sell Game Accounts Instantly!
        </h1>
        <p className="text-lg font-semibold">
          Why grind for hours when you can get your dream account right now? Buy
          or sell securely, quickly, and hassle-free!
        </p>
        <ul className="flex flex-col">
          <li>🔥 Fast & Secure Transactions</li>
          <li>🎮 Wide Selection of Game Accounts</li>
          <li>✅ Your Best Choice – GameACS!</li>
        </ul>
        <Link href="/buy" className="w-fit">
          <Button className="rounded-none w-32">Buy now</Button>
        </Link>
      </div>
      {/* <div className="relative"> */}
      {/* <Image
          src={"/hero.png"}
          alt="hero"
          width={500}
          height={500}
          className="w-[32rem]"
        /> */}
      {/* </div> */}
    </section>
  );
};
export default HeroSection;
