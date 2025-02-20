"use server";

import { getUserByEmail } from "@/api/user";
import { signIn } from "@/auth";
import { generateVerificationToken } from "@/features/tokens/utils";
import { generateUsername } from "@/lib/utils";
import connectDB from "@/mongoose/db";
import Users from "@/mongoose/models/user";
import { sendVerificationEmail } from "@/resend";
import { defauthLoginRedirect } from "@/routes";
import { signinForm } from "@/schemas";
import * as z from "zod";

export const sign_in_google = async () => {
  await signIn("google", {
    redirectTo: defauthLoginRedirect,
  });
};

export const sign_in = async (values: z.infer<typeof signinForm>) => {
  const validatedValues = signinForm.safeParse(values);
  if (!validatedValues.success) return { error: "Invalid fields" };
  try {
    await connectDB();

    const { email } = validatedValues.data;

    let user = await getUserByEmail(email);
    if (!user) {
      const randomUsername = generateUsername();
      user = await Users.create({ username: randomUsername, email: email });
    }

    const token = await generateVerificationToken(email);

    await sendVerificationEmail(token.email, token.token);

    return { success: "Verification email sent!" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong, Try again" };
  }
};
