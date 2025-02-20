"use server";

import { auth } from "@/auth";
import connectDB from "@/mongoose/db";
import Accounts from "@/mongoose/models/account";
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
      await Accounts.findByIdAndUpdate(accountId, { ...values });
      return { success: "Account updated!" };
    } else {
      await Accounts.create({
        userId: session.user.id,
        ...values,
        // chagen into images
        images: [
          "/images/default-account-image.png",
          "/images/default-account-image.png",
        ],
      });

      return { success: "Acccount created!" };
    }
  } catch {
    return { error: "Something went wrong, Try again" };
  }
};
