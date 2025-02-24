"use client";

import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const BackButton = ({ label }: { label: string }) => {
  const router = useRouter();
  const [href, setHref] = useState("/");

  useEffect(() => {
    if (window.history.length > 1) {
      setHref(
        document.referrer !== document.location.href ? document.referrer : "/"
      );
    }
  }, [router]);

  return (
    <Link
      className="text-sm opacity-65 flex items-center hover:opacity-90 transition-all text-center hover:brightness-120 drop-shadow-sm w-fit"
      href={href}
    >
      <ChevronLeft className="size-4 inline mr-2" />
      <span>{label}</span>
    </Link>
  );
};

export default BackButton;
