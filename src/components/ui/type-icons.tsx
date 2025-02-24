import { accountTypes } from "@/config";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface Props {
  type: accountTypes;
  className?: string;
}

const TypeIcons = ({ type, className }: Props) => {
  return (
    <Image
      src={"/icons/tiktok.png"}
      width={50}
      height={50}
      alt={type}
      className={cn("w-[36px]", className)}
    />
  );
};
export default TypeIcons;
