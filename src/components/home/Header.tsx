"use client";

import { navLinks } from "@/config";
import Account from "@/features/auth/components/Account";
import { useCurrentUser } from "@/features/auth/hooks";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import OrdersIcon from "./OrdersIcon";
import MobileNav from "./MobileNav";

const Header = () => {
  const pathname = usePathname();
  const { user } = useCurrentUser();

  return (
    <header className="h-20 wrapper fixed z-50 top-0 inset-x-0 pt-4">
      <div className="h-full border backdrop-blur-xl rounded-lg border-border/20 flex items-center gap-6 px-4">
        <Link href={"/"} className="w-fit">
          <Image
            src={"/logo.png"}
            alt="logo"
            width={50}
            height={50}
            className="w-6"
          />
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-base">
          {navLinks.map((item) => (
            <Link
              key={item.value}
              href={item.value}
              className={cn(pathname === item.value ? "text-primary" : "")}
            >
              {item.name}
            </Link>
          ))}
        </nav>
        <MobileNav />
        <div className="flex items-center gap-3 ml-auto">
          <OrdersIcon />
          <span className="border-l h-8 border-zinc-100/15" />
          {!user && (
            <Link href={"/auth/signin"}>
              <Button>Signin</Button>
            </Link>
          )}
          {user && <Account />}
        </div>
      </div>
    </header>
  );
};
export default Header;
