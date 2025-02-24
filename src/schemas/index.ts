// your schemas go here

import { accountTypeLists, paymentMethodLists } from "@/config";
import * as z from "zod";

export const signinForm = z.object({
  email: z.string().email(),
});

export const profileSchema = z.object({
  username: z.string().optional(),
  imageUrl: z.string().optional(),
});

export const PaymentInfoschema = z.object({
  method: z.enum(paymentMethodLists as [string, ...string[]]),
  fullName: z.string(),
  number: z.string(),
  phoneNumber: z.string(),
});

export const accountSchema = z.object({
  imageUrls: z.array(z.string()),
  type: z.enum(accountTypeLists as [string, ...string[]]),
  title: z.string(),
  description: z.string(),
  level: z.string().optional(),
  pid: z.string().optional(),
  followers: z.string().optional(),
  price: z.string(),
  link: z.string().optional(),
});

export const messageValidator = z.object({
  id: z.string(),
  senderId: z.string(),
  type: z.enum(["image", "text"]),
  text: z.string(),
  timestamp: z.number(),
});

export const messageArrayValidator = z.array(messageValidator);

export type Message = z.infer<typeof messageValidator>;
