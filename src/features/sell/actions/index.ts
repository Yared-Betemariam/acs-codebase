"use server";

import { auth } from "@/auth";
import { accountTypes } from "@/config";
import connectDB from "@/mongoose/db";
import Accounts, { Account } from "@/mongoose/models/account";
import { accountSchema } from "@/schemas";
import { z } from "zod";

export const update_account = async (
  values: z.infer<typeof accountSchema>,
  accountId?: string
) => {
  const validatedFields = accountSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid input", success: undefined };
  }

  try {
    const session = await auth();
    if (!session) {
      return { error: "Unauthorized", success: undefined };
    }

    await connectDB();
    if (accountId) {
      const data = await Accounts.findByIdAndUpdate(
        accountId,
        {
          ...values,
          type: values.type as accountTypes,
          level: values.level || undefined,
          pid: values.pid || undefined,
          followers: values.followers || undefined,
          link: values.link || undefined,
          images: values.imageUrls,
        },
        { new: true }
      ).exec();
      return {
        success: "Account updated!",
        data: JSON.parse(JSON.stringify(data)) as Account,
      };
    } else {
      const data = await Accounts.create({
        ...values,
        userId: session.user.id,
        type: values.type as accountTypes,
        level: values.level || undefined,
        pid: values.pid || undefined,
        followers: values.followers || undefined,
        link: values.link || undefined,
        images: values.imageUrls,
      });

      return {
        success: "Acccount created!",
        data: JSON.parse(JSON.stringify(data)) as Account,
      };
    }
  } catch {
    return { error: "Something went wrong, Try again" };
  }
};

export const delete_account = async (accountId: string) => {
  try {
    const session = await auth();
    if (!session) {
      return { error: "Unauthorized", success: undefined };
    }

    await connectDB();
    await Accounts.findByIdAndDelete(accountId);
    return { success: "Account deleted!" };
  } catch {
    return { error: "Something went wrong, Try again" };
  }
};
