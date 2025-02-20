import NewVerificationForm from "@/features/auth/forms/NewVerificationForm";
import { Suspense } from "react";

const page = () => {
  return (
    <Suspense>
      <NewVerificationForm />
    </Suspense>
  );
};
export default page;
