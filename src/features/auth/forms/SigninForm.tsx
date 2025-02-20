"use client";

import { sign_in } from "@/actions/auth/sign-in";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { signinForm } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import CardWrapper from "../components/CardWrapper";
import FormError from "../../../components/ui/FormError";
import FormSuccess from "../../../components/ui/FormSuccess";

const SigninForm = () => {
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState<undefined | string>();
  const [error, setError] = useState<undefined | string>();

  const [resendIn, setResendIn] = useState(0);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => {
      if (resendIn > 0) {
        setResendIn((prev) => prev - 1);
      }
    }, 1000);
    return () => clearTimeout(id);
  }, [resendIn]);

  const searchParams = useSearchParams();
  const errorParams = searchParams.get("error");

  useEffect(() => {
    if (errorParams == "OAuthAccountNotLinked")
      setError("Email already in use");
  }, [errorParams]);

  const form = useForm<z.infer<typeof signinForm>>({
    resolver: zodResolver(signinForm),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof signinForm>) {
    setError(undefined);
    setSuccess(undefined);
    startTransition(() => {
      sign_in(values)
        .then((data) => {
          setError(data?.error);
          setSuccess(data.success);

          setTimeout(() => {
            setSuccess(undefined);
          }, 2000);

          if (!data.error) {
            setSent(true);
            setResendIn(30);
          }
        })
        .catch(() => setError("Something went wrong!"));
    });
  }

  return (
    <CardWrapper
      backButtonHref="/"
      backButtonLabel="Back to Home"
      headerLabel="Sign in"
      showSocial
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 transition-all duration-300"
        >
          <div className="flex flex-col flex-1">
            {sent ? (
              <>
                <p className="text-sm">
                  A Verification link was sent to email{" "}
                  <em>{form.watch("email")}</em>. Click the link to verify
                  login.
                </p>
              </>
            ) : (
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        placeholder="Email"
                        className="px-4 h-12 min-w-[50px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {resendIn > 0 && (
              <span className="ml-auto mt-2 text-[13px] opacity-80">
                Resend in {resendIn}s
              </span>
            )}

            {sent && resendIn == 0 && (
              <button
                className={cn(
                  "underline active:opacity-80 ml-auto cursor-pointer mt-2 text-[13px]",
                  isPending && "opacity-50"
                )}
              >
                Resend
              </button>
            )}
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button
            type="submit"
            disabled={isPending || resendIn > 0}
            variant={"black"}
            className="w-full rounded-full space-x-3"
          >
            Sign in
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default SigninForm;
