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
  // add image later
  type: z.enum(accountTypeLists as [string, ...string[]]),
  title: z.string(),
  description: z.string(),
  level: z.string().optional(),
  price: z.string(),
  link: z.string().optional(),
});
