"use client";

// import axios from 'axios'
import { FC, useRef, useState } from "react";
import { toast } from "sonner";
import TextareaAutosize from "react-textarea-autosize";
import { Button } from "@/components/ui/button";
import { ImagePlus, Send } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import axios from "axios";

interface ChatInputProps {
  chatId: string;
}

const ChatInput: FC<ChatInputProps> = ({ chatId }) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");

  const sendMessage = async () => {
    if (!input) return;
    setIsLoading(true);

    try {
      await axios.post("/api/message/send", { text: input, chatId });
      setInput("");
      textareaRef.current?.focus();
    } catch {
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex gap-2 justify-between">
      <Label htmlFor="image-upload" className="cursor-pointer">
        <Input
          id="image-upload"
          type="file"
          accept="image/*"
          className="hidden"
          // onChange={handleImageUpload}
        />
        <div className="h-10 w-10 rounded-md border border-border/25 flex items-center justify-center hover:bg-muted/10">
          <ImagePlus className="h-5 w-5" />
        </div>
      </Label>
      <div className="relative flex-1 overflow-hidden rounded-lg shadow-sm ring-1 ring-border/25 ring-inset focus-within:ring-2 focus-within:ring-indigo-600">
        <TextareaAutosize
          ref={textareaRef}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Your message`}
          className="block w-full resize-none border-0 bg-transparent placeholder:text-gray-600 focus-visible:ring-transparent p-2 text-sm"
        />

        {/* <div
          onClick={() => textareaRef.current?.focus()}
          className="py-2 focus:ring-0"
          aria-hidden="true"
        >
          <div className="py-px">
            <div className="h-6" />
          </div>
        </div> */}
      </div>

      <div className="flex-shrin-0">
        <Button size="icon" disabled={isLoading} onClick={sendMessage}>
          <Send className="h-5 w-5" />
          <span className="sr-only">Send message</span>
        </Button>
      </div>
    </div>
  );
};

export default ChatInput;
