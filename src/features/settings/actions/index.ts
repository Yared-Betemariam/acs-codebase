"use server";

import { auth } from "@/auth";
import connectDB from "@/mongoose/db";
import PaymentInfos from "@/mongoose/models/payment-info";
import Users from "@/mongoose/models/user";
import { PaymentInfoschema, profileSchema } from "@/schemas";
import { z } from "zod";

export const update_user = async (values: z.infer<typeof profileSchema>) => {
  const validatedFields = profileSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid input", success: undefined };
  }

  try {
    const session = await auth();

    if (!session) {
      return { error: "Unauthorized", success: undefined };
    }

    if (values.username !== undefined && values.username == "") {
      return { error: "Username cannot be empty", success: undefined };
    }

    await connectDB();
    const user = await Users.findOne({ username: values.username });
    if (user && user.id !== session.user.id) {
      return { error: "Username already exists", success: undefined };
    }

    await Users.findByIdAndUpdate(session.user.id, { ...values });

    return { success: "Profile updated!" };
  } catch {
    return { error: "Something went wrong, Try again" };
  }
};

export const update_paymentinfo = async (
  values: z.infer<typeof PaymentInfoschema>
) => {
  const validatedFields = PaymentInfoschema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid input", success: undefined };
  }

  try {
    const session = await auth();

    if (!session) {
      return { error: "Unauthorized", success: undefined };
    }

    await connectDB();

    const paymentInfo = await PaymentInfos.findOne({ userId: session.user.id });

    if (paymentInfo) {
      await PaymentInfos.findByIdAndUpdate(paymentInfo.id, { ...values });
      return { success: "Payment info updated!" };
    } else {
      const payemtInfo = await PaymentInfos.create({
        userId: session.user.id,
        ...values,
      });
      await Users.findByIdAndUpdate(session.user.id, {
        paymentInfoId: payemtInfo._id,
      });
      return { success: "Payment info created!" };
    }
  } catch {
    return { error: "Something went wrong, Try again" };
  }
};
