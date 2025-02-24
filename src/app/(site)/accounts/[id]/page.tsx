"use client";

import Loading from "@/components/ui/loading";
import { Account } from "@/mongoose/models/account";
import { User } from "@/mongoose/models/user";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {
  ChartLine,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import Image from "next/image";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Error from "@/components/ui/error";
import TypeIcons from "@/components/ui/type-icons";
import MakeOrder from "@/features/orders/components/make-order";
import Link from "next/link";

const Page = () => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<{ account?: Account; owner?: User } | null>(
    null
  );
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    if (id) {
      fetch(`/api/accounts/${id}`)
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
  }, [id]);

  if (loading) {
    return <Loading text="Loading account info" center />;
  }

  if (data === null) {
    return <Error center text="Account not found!" />;
  }

  const { account, owner } = data;
  if (!account || !owner) {
    return <Error text="Data didn't Load, Refresh the page!" center />;
  }

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % account.images.length);
  };

  const previousImage = () => {
    setCurrentImage(
      (prev) => (prev - 1 + account.images.length) % account.images.length
    );
  };

  return (
    <main className="wrapper pt-28 pb-14 flex flex-1 flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="h1">Account</h1>
        <span
          onClick={() => router.back()}
          className="text-sm hover:underline hover:opacity-50 duration-300 transition-all flex items-center cursor-pointer"
        >
          <ChevronLeft className="size-6" /> <span>Back</span>
        </span>
      </div>
      <div className="gap-8 flex flex-col md:flex-row">
        <div className="relative max-w-[45%] md:w-full">
          <div className="relative aspect-square overflow-hidden rounded-lg">
            <Image
              src={account.images[currentImage] || "/placeholder.svg"}
              alt={`Account image ${currentImage + 1}`}
              fill
              className="object-cover"
              priority
            />
            {account.images.length > 1 && (
              <>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute left-2 top-1/2 -translate-y-1/2"
                  onClick={previousImage}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
          <div className="mt-4 flex justify-center gap-2 brightness-150">
            {account.images.map((_, index) => (
              <Button
                key={index}
                variant={currentImage === index ? "default" : "secondary"}
                size="icon"
                className="h-2 w-2 rounded-full p-0"
                onClick={() => setCurrentImage(index)}
              >
                <span className="sr-only">View image {index + 1}</span>
              </Button>
            ))}
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-4">
          <h1 className="text-3xl font-bold">{account.title}</h1>
          <div className="mt-2 flex items-center gap-8">
            <div className="flex flex-col">
              <span className="text-zinc-400">Type</span>
              <div className="flex gap-2 items-center">
                <TypeIcons type={account.type} />
                <span className="text-[22px] font-medium capitalize">
                  {account.type}
                </span>
              </div>
            </div>
            {account.level && (
              <div className="flex flex-col">
                <span className="text-zinc-400">Level</span>
                <div className="flex gap-2 items-center">
                  <ChartLine className="size-[25px]" />
                  <span className="text-[22px] font-medium capitalize">
                    {account.level}
                  </span>
                </div>
              </div>
            )}
          </div>
          <div>
            {account.link && (
              <div className="flex gap-2">
                <span className="text-base opacity-75">Account Link</span> —
                <Link
                  href={account.link}
                  className="underline flex items-center gap-1 text-blue-300"
                >
                  Open link <ExternalLink className="inline size-4" />
                </Link>
              </div>
            )}
            {account.link && (
              <div className="flex gap-2">
                <span className="text-base opacity-75">Player Id</span> —
                <span>{account.pid}</span>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <span className="text-3xl font-semibold whitespace-nowrap">
              <span className="text-base opacity-50 font-normal mr-1">ETB</span>
              {account.price.toFixed(2)}
            </span>
            <p className="text-zinc-400">{account.description}</p>
          </div>

          <Link
            href={`/users/${owner.username}`}
            className="relative flex items-center mt-8 gap-4 bg-zinc-900 hover:bg-zinc-900/75 duration-300 transition-all p-4 py-3 rounded-lg"
          >
            <Avatar className="cursor-pointer">
              <AvatarImage src={owner.imageUrl!} />
              <AvatarFallback className="uppercase">
                {owner.username && owner.username[0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm text-zinc-400">Owner</p>

              <span className="text-xl font-medium">@{owner.username}</span>
            </div>
            <ChevronRight className=" absolute size-6 opacity-50 top-1/2 -translate-y-1/2 right-6" />
          </Link>

          <MakeOrder account={account} />
        </div>
      </div>
    </main>
  );
};

export default Page;
