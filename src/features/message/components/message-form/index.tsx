"use client";

import type React from "react";

import { ImagePlus, Send } from "lucide-react";
import { useEffect, useMemo, useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Error from "@/components/ui/error";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Loading from "@/components/ui/loading";
import { Textarea } from "@/components/ui/textarea";
import { chatHrefConstructor } from "@/lib/utils";
import { Message } from "@/schemas";
import { get_chat_messgages } from "../../actions";
import ChatInput from "./ChatInput";
import Messages from "./Messages";

interface MessageComponentProps {
  currentUserId: string;
  partnerUserId: string;
}

export function MessageComponent({
  currentUserId,
  partnerUserId,
}: MessageComponentProps) {
  const [initialMessages, setInitialMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const chatId = useMemo(
    () => chatHrefConstructor(currentUserId, partnerUserId),
    [currentUserId, partnerUserId]
  );

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<undefined | string>();

  useEffect(() => {
    const handleFetch = async () => {
      setError(undefined);
      startTransition(() => {
        get_chat_messgages(chatId)
          .then((data) => {
            if ("error" in data) {
              setError(data.error);
            } else {
              setInitialMessages(data);
            }
          })
          .catch(() => setError("Something went wrong!"));
      });
    };
    handleFetch();
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  // const handleSendMessage = () => {
  //   if (newMessage.trim() || selectedImage) {
  //     const message: Message = {
  //       id: Math.random().toString(),
  //       text: newMessage,
  //       sender: currentUserId,
  //       timestamp: new Date(),
  //       image: selectedImage ? URL.createObjectURL(selectedImage) : undefined,
  //     };
  //     setInitialMessages([...messages, message]);
  //     setNewMessage("");
  //     setSelectedImage(null);
  //   }
  // };

  return (
    <div className="border flex flex-col  h-full border-border/25 rounded-lg">
      <CardHeader>
        <CardTitle>Messages</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <div className="flex flex-col-reverse flex-1 bg-zinc-900 overflow-y-auto border rounded-lg border-border/25 p-2 mb-4 gap-2 max-h-[300px]">
          {isPending ? (
            <Loading text="Loading messages" center />
          ) : error ? (
            <Error text="Error fetching messages, Refresh the page and try again" />
          ) : (
            <Messages
              chatId={chatId}
              initialMessages={initialMessages}
              userId={currentUserId}
            />
          )}
        </div>
        {/* <div className="flex gap-2">
          <Label htmlFor="image-upload" className="cursor-pointer">
            <Input
              id="image-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
            <div className="h-10 w-10 rounded-md border border-border/25 flex items-center justify-center hover:bg-muted/10">
              <ImagePlus className="h-5 w-5" />
            </div>
          </Label>
          <Textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 min-h-[80px] h-10 resize-none py-2"
          />
        </div> */}
        <ChatInput chatId={chatId} />
        {selectedImage && (
          <div className="mt-2 text-sm text-muted-foreground">
            Image selected: {selectedImage.name}
          </div>
        )}
      </CardContent>
    </div>
  );
}
