"use client";

import { newVerification } from "@/actions/auth/new-verification";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import CardWrapper from "../components/CardWrapper";
import FormError from "../../../components/ui/FormError";

const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>();

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (error) {
      return;
    }

    if (!token) {
      setError("Missing token");
      return;
    }

    newVerification(token as string).then((data) => {
      setError(data?.error || undefined);
      if (data.redirect) {
        location.reload();
      }
    });
  }, [token, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper
      headerLabel="Confirming your identity"
      backButtonHref="/auth/sign-in"
      backButtonLabel="Back to Signin"
    >
      {!error && <BeatLoader loading color="white" />}
      <FormError message={error} />
    </CardWrapper>
  );
};
export default NewVerificationForm;
