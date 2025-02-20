import HeroSection from "@/components/home/Hero";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col flex-1">
      <Image
        src={"/all.png"}
        alt="hero"
        width={1000}
        height={1000}
        className="w-full absolute -z-10"
      />
      <HeroSection />
    </main>
  );
}
