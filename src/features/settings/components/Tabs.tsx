"use client";

/* eslint-disable react/no-unescaped-entities */
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import FormError from "@/components/ui/FormError";
import FormSuccess from "@/components/ui/FormSuccess";
import FormWarning from "@/components/ui/FormWarning";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Loading from "@/components/ui/loading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { paymentMethods, paymentMethodTypes } from "@/config";
import { useCurrentUser } from "@/features/auth/hooks";
import React, { useEffect, useState, useTransition } from "react";
import { GoUpload } from "react-icons/go";
import { update_paymentinfo, update_user } from "../actions";
import { usePaymentInfoStore } from "../store";

export function SettingTabs() {
  const { user } = useCurrentUser();
  const [username, setUsername] = useState("");
  const [success, setSuccess] = useState<undefined | string>();
  const [error, setError] = useState<undefined | string>();
  const [isPending, startTransition] = useTransition();

  // payments
  const [selectedPayment, setSelectedPayment] =
    useState<paymentMethodTypes>("telebirr");
  const [ownerName, setOwnerName] = useState<string>("");
  const [number, setNumber] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const { loadPaymentInfo, paymentInfo } = usePaymentInfoStore();
  const [paymentStatus, setPaymentStatus] = useState<
    "success" | "loading" | "error" | undefined
  >();

  useEffect(() => {
    if (paymentInfo === undefined) {
      setPaymentStatus("loading");
    }

    if (paymentInfo === null) {
      setPaymentStatus("error");
    }

    if (paymentInfo) {
      setPaymentStatus("success");

      setSelectedPayment(paymentInfo.method);
      setOwnerName(paymentInfo.fullName);
      setNumber(paymentInfo.number);
      setPhoneNumber(paymentInfo.phoneNumber);
    }
  }, [paymentInfo]);

  useEffect(() => {
    if (user?.username) {
      setUsername(user.username);
    }
  }, [user?.username]);

  if (!user) {
    return <Loading text="Loading user data..." center />;
  }

  const handleProfileUpdate = () => {
    setError(undefined);
    setSuccess(undefined);

    if (username === user.username) {
      setError("Username is the same as before!");
      return;
    }

    if (username === "") {
      setError("Username can't be empty!");
      return;
    }

    startTransition(() => {
      update_user({ username })
        .then((data) => {
          setError(data?.error);
          setSuccess(data.success);
        })
        .catch(() => setError("Something went wrong!"));
    });
  };

  const handlePaymentUpdate = () => {
    setError(undefined);
    setSuccess(undefined);

    if (!ownerName || !number || !phoneNumber) {
      setError("Please fill all the fields!");
      return;
    }

    if (
      ownerName === paymentInfo?.fullName &&
      number === paymentInfo?.number &&
      phoneNumber === paymentInfo?.phoneNumber &&
      selectedPayment === paymentInfo?.method
    ) {
      setError("You haven't made any changes!");
      return;
    }

    startTransition(() => {
      update_paymentinfo({
        fullName: ownerName,
        number,
        method: selectedPayment,
        phoneNumber,
      })
        .then((data) => {
          setError(data?.error);
          setSuccess(data.success);
        })
        .catch(() => setError("Something went wrong!"));
    });
  };

  return (
    <Tabs defaultValue="profile">
      <TabsList className="h-10 grid w-full grid-cols-2 bg-transparent border border-zinc-100/20">
        <TabsTrigger value="profile" className="h-full">
          Profile
        </TabsTrigger>
        <TabsTrigger
          onClick={() =>
            !paymentInfo &&
            paymentStatus !== "success" &&
            loadPaymentInfo(user.paymentInfoId || "")
          }
          value="payments"
          className="h-full"
        >
          Payments
        </TabsTrigger>
      </TabsList>
      <TabsContent value="profile">
        <TabWrapper
          loading={isPending}
          title="Profile"
          buttonFunc={handleProfileUpdate}
          description="Change your profile settings of you account."
          buttonLabel="Save Changes"
        >
          <div className="border border-border/25 rounded-full p-2  gap-6 flex items-center">
            <Avatar className="size-20">
              <AvatarFallback className="text-5xl bg-primary font-light uppercase">
                {user.username && user.username[0]}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-2 flex-col flex">
              <Label className="opacity-25">Profile picture</Label>
              <Button
                variant={"outline"}
                size="sm"
                className="bg-transparent border-border/25"
              >
                <GoUpload className="inline size-4" />
                Upload image
              </Button>
            </div>
          </div>
          <div className="space-y-1">
            <Label htmlFor="username">Username</Label>
            <div className="flex">
              <span className="h-10 border border-border/25 rounded-l-md px-2 flex items-center justify-center opacity-50">
                @
              </span>
              <Input
                id="username"
                placeholder={user.username!}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="h-10 rounded-l-none"
              />
            </div>
          </div>
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input disabled id="email" value={user.email!} />
          </div>
          {!user.paymentInfoId && (
            <FormWarning message="You haven't set up a payment method yet!" />
          )}
          <FormError message={error} />
          <FormSuccess message={success} />
        </TabWrapper>
      </TabsContent>
      <TabsContent value="payments">
        <TabWrapper
          loading={isPending || paymentStatus === "loading"}
          loadingCpt={
            paymentStatus === "loading" ? (
              <Loading text="Loading payment info..." />
            ) : undefined
          }
          buttonLabel="Update Information"
          buttonFunc={handlePaymentUpdate}
          title="Payments"
          description="Update your payment method."
        >
          <FormWarning message="Make sure to put the right information here!" />
          <div className="space-y-2">
            <Label htmlFor="payment-method">Payment Method</Label>
            <Select
              value={selectedPayment}
              onValueChange={(e) => setSelectedPayment(e as paymentMethodTypes)}
            >
              <SelectTrigger id="payment-method">
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
              <SelectContent>
                {paymentMethods.map((method) => (
                  <SelectItem
                    key={method.id}
                    value={method.id}
                    className="flex items-center gap-2"
                  >
                    <div className="flex items-center gap-2">{method.name}</div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="owner-name">Account Owner Full Name</Label>
            <Input
              id="owner-name"
              placeholder="Solomon Derege Kassa"
              value={ownerName}
              required
              onChange={(e) => setOwnerName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="number-name">Account number/phone number</Label>
            <Input
              id="number-name"
              required
              placeholder="1000291910850/0912345678"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone-number">
              Contact Phone number (incase of emergency)
            </Label>
            <Input
              id="phone-number"
              required
              placeholder="0912345678"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
        </TabWrapper>
      </TabsContent>
    </Tabs>
  );
}

type TabWrapperProps = {
  children: React.ReactNode;
  title: string;
  loading?: boolean;
  loadingCpt?: React.ReactNode;
  description: string;
  buttonLabel: string;
  buttonFunc: () => void;
};

const TabWrapper = ({
  children,
  title,
  loading,
  loadingCpt,
  description,
  buttonFunc,
  buttonLabel,
}: TabWrapperProps) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        buttonFunc();
      }}
      className="bg-transparent border-transparent text-white"
    >
      <CardHeader className="px-0">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2 px-0">
        {loadingCpt && loading ? loadingCpt : children}
      </CardContent>
      <CardFooter className="px-0">
        <Button disabled={loading}>{buttonLabel}</Button>
      </CardFooter>
    </form>
  );
};
