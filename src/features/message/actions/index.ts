"use server";

import { fetchRedis } from "@/features/redis/utils";
import { messageArrayValidator } from "@/schemas";

export const get_chat_messgages = async (chatId: string) => {
  try {
    const result: string[] = await fetchRedis(
      "zrange",
      `chat:${chatId}:messages`,
      0,
      -1
    );
    const dbMessages = result.map((message) => JSON.parse(message) as Message);
    const reversedMessages = dbMessages.reverse();
    const messages = messageArrayValidator.parse(reversedMessages);
    return messages;
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong, Try again" };
  }
};
