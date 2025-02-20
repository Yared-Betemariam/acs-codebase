import { BASE_URL } from "@/config";
import "dotenv/config";

import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${BASE_URL}/auth/new-verification?token=${token}`;
  await resend.emails.send({
    from: "onboarding!@resend.dev",
    to: email,
    subject: "Confirm your email",
    html: `
    <div style='background-color: white; border-top: 10px solid black; border-bottom: 5px solid black; padding: 1rem;'>
    <p>Click <a href="${confirmLink}">Here</a> to confirm email.</p>
  </div>
  `,
  });
};
