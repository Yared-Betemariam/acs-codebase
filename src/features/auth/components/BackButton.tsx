import { ChevronLeft } from "lucide-react";
import Link from "next/link";

const BackButton = ({ href, label }: { href: string; label: string }) => {
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
