"use client";

import { logout } from "@/actions/auth/logout";

interface LogoutButtonProps {
  children: React.ReactNode;
}

const LogoutButton = ({ children }: LogoutButtonProps) => {
  const onClick = async () => {
    await logout();
    location.reload();
  };
  return <span onClick={onClick}>{children}</span>;
};
export default LogoutButton;
