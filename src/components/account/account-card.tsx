"use client";

import { ChevronLeft, ChevronRight, Trash2 } from "lucide-react";
import Image from "next/image";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { delete_account } from "@/features/sell/actions";
import EditAccount from "@/features/sell/components/edit-account";
import { cn } from "@/lib/utils";
import { Account } from "@/mongoose/models/account";
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";
import { useConfirmationDialogStore } from "../modals/store";
import TypeIcons from "../ui/type-icons";

interface AccountCardProps {
  account: Account;
  editable?: boolean;
  Edit?: React.ReactNode;
  Delete?: React.ReactNode;
  onDelete?: () => void;
}

export default function AccountCard({
  account,
  editable = false,
  onDelete,
}: AccountCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const { openDialog, setStatus } = React.useMemo(
    () => ({
      openDialog: useConfirmationDialogStore.getState().openDialog,
      setStatus: useConfirmationDialogStore.getState().setStatus,
    }),
    []
  );

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % account.images.length);
  };

  const previousImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + account.images.length) % account.images.length
    );
  };

  const handleDelete = async () => {
    setStatus("loading");
    const id = String(account._id);
    if (!id) {
      return setStatus("error");
    }
    await delete_account(id);
    onDelete?.();
    setStatus("success");
  };

  return (
    <Card className="rounded-lg overflow-hidden bg-black text-white border-border/25 relative">
      <TypeIcons type={account.type} className="absolute z-50 top-2 left-2" />
      <div className="relative aspect-square">
        <div className="absolute inset-0">
          <Image
            src={account.images[currentImageIndex] || "/placeholder.svg"}
            alt={`Product image ${currentImageIndex + 1} of ${account.title}`}
            fill
            className="object-cover"
            priority
          />
        </div>
        {account.images.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background/90"
              onClick={previousImage}
              aria-label="Previous image"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background/90"
              onClick={nextImage}
              aria-label="Next image"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <div className="absolute brightness-150 bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
              {account.images.map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    "w-1.5 h-1.5 rounded-full bg-background/80",
                    index === currentImageIndex && "bg-background"
                  )}
                />
              ))}
            </div>
          </>
        )}
      </div>
      <CardHeader className="px-2 pt-2 pb-2">
        <CardTitle className="gap-4">
          <span className="text-lg font-semibold line-clamp-1">
            {account.title}
          </span>
          <span className="text-2xl font-semibold whitespace-nowrap">
            <span className="text-base opacity-50 font-normal">ETB</span>
            {account.price.toFixed(2)}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="px-2 pb-2">
        {account.level && (
          <p className="text-lg font-semibold whitespace-nowrap">
            <span className="text-base opacity-50 font-normal">lvl.</span>
            {account.level}
          </p>
        )}
        {account.followers && (
          <p className="text-lg font-semibold whitespace-nowrap">
            <span className="text-base opacity-50 font-normal">followers.</span>
            {account.followers}
          </p>
        )}
        {/* {account.followers && (
          <div className="flex flex-col">
            <span className="text-sm opacity-50 font-normal">Followers</span>
            <p className="flex items-center gap-2 text-lg font-semibold">
              <BsFillPeopleFill /> <span>{account.followers}</span>
            </p>
          </div>
        )} */}
        <Link href={`/accounts/${account._id}`}>
          <Button
            variant={"outline"}
            className="bg-transparent w-full border-border/25"
          >
            More info <BsArrowRight className="ml-auto" />
          </Button>
        </Link>
      </CardContent>
      {editable && (
        <CardFooter className="gap-2 border-t border-border/25 p-2 ">
          <EditAccount account={account} />
          <Button
            size={"sm"}
            onClick={() =>
              openDialog(
                "Delete account",
                "This action cannot be undone. This will permanently delete your account and remove your data from our servers.",
                handleDelete
              )
            }
            variant={"outline"}
            className="bg-transparent border-border/25"
          >
            <Trash2 /> Delete
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
