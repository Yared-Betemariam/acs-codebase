import SigninForm from "@/features/auth/forms/SigninForm";
import { Loader2 } from "lucide-react";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Sign in",
  description: "",
};
const page = () => {
  return (
    <Suspense>
      <SigninForm />
    </Suspense>
  );
};
export default page;
