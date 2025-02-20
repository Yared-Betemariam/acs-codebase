"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { GoSignOut } from "react-icons/go";
import { SlSettings } from "react-icons/sl";
import { useCurrentUser } from "../hooks";
import LogoutButton from "./SignoutButton";
import Link from "next/link";

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
        <Button
          variant={"ghost"}
          className="rounded-lg settleborder drop-shadow hover:opacity-85 transition-all duration-100 p-0 flex h-[2.35rem] w-[2.35rem]"
        >
          <Avatar className="rounded-lg h-[2.35rem] w-[2.35rem] ring-1 border-black/70 bg-primary flex flex-col items-center focus-visible:ring-offset-0 focus-visible:ring-ring/60 justify-center text-gray-50/80 ring-gray-900/40">
            <AvatarFallback className="bg-transparent uppercase font-light text-lg">
              {user.username && user.username[0]}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="min-w-[14rem]  drop-shadow-sm bg-black text-white border-zinc-100/20"
      >
        <div className="flex flex-col p-4">
          <span className=" text-xs font-normal">Profile settings</span>
          <span className="text-semibold text-sm">{user.email}</span>
        </div>
        <Link href="/settings">
          <DropdownMenuSeparator className="min-w-[14rem] opacity-20" />
          <DropdownMenuItem className="min-w-[14rem] px-4 py-2">
            <SlSettings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator className="min-w-[14rem] opacity-20" />
        <LogoutButton>
          <DropdownMenuItem className="min-w-[14rem] px-4 py-2">
            <GoSignOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default Account;
