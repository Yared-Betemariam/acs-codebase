interface Chat {
  id: string;
  messages: Message[];
}

interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  type: "text" | "image";
  text: string;
  timestamp: number;
}
