"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Play, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { GoSignOut } from "react-icons/go";
import { SlSettings } from "react-icons/sl";
import { useCurrentUser } from "../hooks";
import LogoutButton from "./SignoutButton";

const Account = () => {
  const { user, isLoading } = useCurrentUser();

  if (isLoading) {
    return (
      <Avatar className="animate-pulse rounded-lg w-[2.35rem] h-[2.35rem]">
        <AvatarFallback className="rounded-lg">
          <div
            role="status"
            className="flex items-center justify-center h-full w-full bg-black/10 rounded-lg "
          />
        </AvatarFallback>
      </Avatar>
    );
  }
  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="p-0">
        <Avatar className="ring-2 ring-transparent duration-300 transition-all hover:ring-border/25 cursor-pointer">
          <AvatarImage src={user.image!} />
          <AvatarFallback className="uppercase">
            {user.username && user.username[0]}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="min-w-[14rem]  drop-shadow-sm bg-black text-white border-zinc-100/20"
      >
        <div className="flex flex-col p-3 pb-2">
          <span className=" text-xs font-normal opacity-50">Username</span>
          <span className="text-semibold text-sm">@{user.username}</span>
        </div>
        <DropdownMenuSeparator className="min-w-[14rem] opacity-20" />
        <Link href={`/users/${user.username}`}>
          <DropdownMenuItem className="min-w-[14rem] px-3 py-1.5">
            <Play className="mr-2 h-4 w-4" />
            <span>Preview</span>
          </DropdownMenuItem>
        </Link>
        <Link href={`/orders`}>
          <DropdownMenuItem className="min-w-[14rem] px-3 py-1.5">
            <ShoppingBag className="mr-2 h-4 w-4" />
            <span>Orders</span>
          </DropdownMenuItem>
        </Link>
        <Link href="/settings">
          <DropdownMenuItem className="min-w-[14rem] px-3 py-1.5">
            <SlSettings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator className="min-w-[14rem] opacity-20" />
        <LogoutButton>
          <DropdownMenuItem className="min-w-[14rem] px-3 py-1.5">
            <GoSignOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default Account;
