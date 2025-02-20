"use client";

import { useRouter } from "next/navigation";

interface LoginButtonProps {
  children: React.ReactNode;
}

const LoginButton = ({ children }: LoginButtonProps) => {
  const router = useRouter();
  const onClick = () => {
    router.push("/auth/sign-in");
  };
  return <div onClick={onClick}>{children}</div>;
};
export default LoginButton;
