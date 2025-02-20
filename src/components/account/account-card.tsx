"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
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
import { cn } from "@/lib/utils";
import { Account } from "@/mongoose/models/account";

interface AccountCardProps {
  account: Account;
  editable?: boolean;
  Edit?: React.ReactNode;
  Delete?: React.ReactNode;
}

export default function AccountCard({
  account: { title, description, images, price, level },
  editable = false,
  Edit,
  Delete,
}: AccountCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const previousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <Card className="w-full rounded-lg max-w-[256px] overflow-hidden bg-black text-white border-border/25 h-fit ">
      <div className="relative aspect-square">
        <div className="absolute inset-0">
          <Image
            src={images[currentImageIndex] || "/placeholder.svg"}
            alt={`Product image ${currentImageIndex + 1} of ${title}`}
            fill
            className="object-cover"
            priority
          />
        </div>
        {images.length > 1 && (
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
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
              {images.map((_, index) => (
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
      <CardHeader>
        <CardTitle className="flex items-start justify-between gap-4">
          <span className="text-lg font-semibold line-clamp-1">{title}</span>
          <span className="text-lg font-bold whitespace-nowrap">
            ${price.toFixed(2)}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {description}
        </p>
        {level && (
          <p className="mt-2 text-sm">
            <span className="font-medium">Level:</span> {level}
          </p>
        )}
      </CardContent>
      {editable && (
        <CardFooter className="gap-2 border-t border-border-25">
          {Edit}
          {Delete}
        </CardFooter>
      )}
    </Card>
  );
}
