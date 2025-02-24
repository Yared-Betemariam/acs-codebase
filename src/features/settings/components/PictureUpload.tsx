"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { User } from "next-auth";
import { GoUpload } from "react-icons/go";

import { useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { update_user } from "../actions";
import FormError from "@/components/ui/FormError";
import FormSuccess from "@/components/ui/FormSuccess";
import { useSessionUpdate } from "../hooks";
import Image from "next/image";
import { toast } from "sonner";

interface Props {
  user: {
    username?: string;
    paymentInfoId?: string;
  } & User;
}

export default function ProfileUpload({ user }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const { updateUser } = useSessionUpdate();

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 1024 * 1024) {
      toast.error("File size exceeds 1MB limit.");
      setError("File size exceeds 1MB limit.");
      return;
    }

    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
    setError(null);
  };

  const uploadToCloudflare = async () => {
    if (!selectedFile) return;

    try {
      setIsUploading(true);
      setError(null);

      const { data } = await axios.get(
        `/api/upload/images?filename=${selectedFile.name}`
      );
      const uploadUrl = data.uploadUrl;
      const imageUrl = data.imageUrl;

      await axios.put(uploadUrl, selectedFile, {
        headers: { "Content-Type": selectedFile.type },
      });

      // Save to database
      await update_user({ imageUrl });

      updateUser({ imageUrl });
      setSuccess("Profile picture updated!");
    } catch (err) {
      console.error(err);
      setError("Upload failed. Try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      <div className="border border-border/25 rounded-full p-2  gap-6 flex items-center">
        <Avatar className="size-20">
          <AvatarImage src={user.image!} />
          <AvatarFallback className="text-4xl uppercase">
            {user.username && user.username[0]}
          </AvatarFallback>
        </Avatar>
        <div className="space-y-2 flex-col flex">
          <Label className="opacity-50">
            Profile picture — Recommended 100x100
          </Label>
          <Input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onFileChange}
          />
          <Button
            type="button"
            onClick={() => inputRef.current?.click()}
            variant={"outline"}
            size="sm"
            className="bg-transparent border-border/25 w-fit"
          >
            <GoUpload className="inline size-4" />
            Upload image
          </Button>
        </div>
      </div>
      {/* Dialog for preview */}
      <Dialog open={!!preview} onOpenChange={() => setPreview(null)}>
        <DialogContent className="w-72">
          <DialogHeader>
            <DialogTitle>Preview Image</DialogTitle>
          </DialogHeader>
          <div className="px-4 pt-4">
            {preview && (
              <Image
                width={100}
                height={100}
                src={preview}
                alt="Preview"
                className="w-32 h-32 rounded-full mx-auto mb-4"
              />
            )}
            {error && <FormError message={error} skeleton />}
            {success && <FormSuccess message={success} skeleton />}
          </div>
          <div className="flex justify-end gap-2 px-4 pb-4">
            <Button
              variant="outline"
              className="bg-transparent border-border/25"
              onClick={() => setPreview(null)}
            >
              Cancel
            </Button>
            <Button
              onClick={uploadToCloudflare}
              disabled={isUploading}
              className="flex-1"
            >
              {isUploading ? "Uploading..." : "Confirm Upload"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
