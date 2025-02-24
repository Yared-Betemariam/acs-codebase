"use client";

import type React from "react";

import { X } from "lucide-react";
import Image from "next/image";

export type ImageSlot = {
  id: string;
  file: File | null;
  preview: string;
  label: string;
};

type Props = {
  images: ImageSlot[];
  setImages: React.Dispatch<React.SetStateAction<ImageSlot[]>>;
};
export default function ImageUploads({ images, setImages }: Props) {
  const handleImageSelect = (
    e: React.ChangeEvent<HTMLInputElement>,
    slotId: string
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      let fileName = file.name;
      const existingFileNames = images.map((slot) => slot.file?.name);

      let counter = 1;
      while (existingFileNames.includes(fileName)) {
        const fileExtension = file.name.split(".").pop();
        const baseName = file.name.replace(`.${fileExtension}`, "");
        fileName = `${baseName}_${counter}.${fileExtension}`;
        counter++;
      }

      const previewUrl = URL.createObjectURL(file);
      setImages((prev) =>
        prev.map((slot) =>
          slot.id === slotId
            ? { ...slot, file: new File([file], fileName), preview: previewUrl }
            : slot
        )
      );
    }
  };

  const resetImage = (slotId: string) => {
    setImages((prev) =>
      prev.map((slot) => {
        if (slot.id === slotId) {
          // Clean up the object URL to prevent memory leaks
          if (slot.preview) URL.revokeObjectURL(slot.preview);
          return { ...slot, file: null, preview: "" };
        }
        return slot;
      })
    );
  };

  const mainImage = images[0];
  const optionalImages = images.slice(1);

  return (
    <div className="space-y-4">
      <div className="relative">
        <label
          className={`relative flex size-[236px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 transition-colors ${
            mainImage.preview ? "bg-background" : "bg-zinc-700/30"
          }`}
        >
          {mainImage.preview ? (
            <>
              <Image
                width={300}
                height={300}
                src={mainImage.preview || "/placeholder.svg"}
                alt="Main preview"
                className="h-full w-full rounded-lg object-cover"
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  resetImage(mainImage.id);
                }}
                className="absolute right-2 top-2 rounded-full bg-destructive p-1 text-destructive-foreground shadow-sm transition-transform hover:scale-110"
              >
                <X className="h-4 w-4" />
              </button>
            </>
          ) : (
            <div className="text-center">
              <div className="text-2xl font-semibold">{mainImage.label}</div>
              <p className="text-sm text-muted-foreground">
                Click or drag and drop to upload
              </p>
            </div>
          )}
          <input
            type="file"
            className="hidden"
            onChange={(e) => handleImageSelect(e, mainImage.id)}
            accept="image/*"
          />
        </label>
      </div>

      <div className="grid gap-4 grid-cols-2">
        {optionalImages.map((slot) => (
          <div key={slot.id} className="relative">
            <label
              className={`relative flex size-[150px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 transition-colors hover:border-muted-foreground/50 ${
                slot.preview ? "bg-background" : "bg-zinc-700/30"
              }`}
            >
              {slot.preview ? (
                <>
                  <Image
                    width={300}
                    height={300}
                    src={slot.preview || "/placeholder.svg"}
                    alt={`${slot.label} preview`}
                    className="h-full w-full rounded-lg object-cover"
                  />
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      resetImage(slot.id);
                    }}
                    className="absolute right-2 top-2 rounded-full bg-destructive p-1 text-destructive-foreground shadow-sm transition-transform hover:scale-110"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </>
              ) : (
                <div className="text-center">
                  <div className="font-semibold">{slot.label}</div>
                  <p className="text-sm text-muted-foreground">
                    Click to upload
                  </p>
                </div>
              )}
              <input
                type="file"
                className="hidden"
                onChange={(e) => handleImageSelect(e, slot.id)}
                accept="image/*"
              />
            </label>
          </div>
        ))}
      </div>

      {/* <div className="flex justify-end">
        <Button
          onClick={handleUpload}
          disabled={!images.some((slot) => slot.file !== null)}
        >
          Upload Images
        </Button>
      </div> */}
    </div>
  );
}
