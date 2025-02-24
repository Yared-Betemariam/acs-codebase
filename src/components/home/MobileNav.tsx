"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { navLinks } from "@/config";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { buttonVariants } from "../ui/button";

const MobileNav = () => {
  const [open, isOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={isOpen}>
      <PopoverTrigger asChild className="md:hidden">
        <span className="relative hover:bg-accent/10 rounded-lg duration-300 transition-all inline-flex p-1.5">
          <Menu className="size-5" />
          <span className="sr-only">Menu</span>
        </span>
      </PopoverTrigger>
      <PopoverContent className="max-w-fit flex flex-col gap-2 text-start">
        {navLinks.map((item) => (
          <Link
            href={item.value}
            onClick={() => isOpen(false)}
            key={item.name}
            className={cn(buttonVariants({ variant: "ghost" }))}
          >
            {item.name}
          </Link>
        ))}
      </PopoverContent>
    </Popover>
  );
};
export default MobileNav;
