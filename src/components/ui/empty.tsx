import { cn } from "@/lib/utils";
import { Rabbit } from "lucide-react";

interface Props {
  text?: string;
  center?: boolean;
}

const Empty = ({ text, center }: Props) => {
  return (
    <div
      className={cn(
        "flex items-center opacity-60",
        center ? "flex-col justify-center mx-auto my-auto gap-2" : "gap-3"
      )}
    >
      <Rabbit className="size-40 opacity-15 absolute" />
      <span className="text-sm">
        {text || "There is nothing to look here!"}
      </span>
    </div>
  );
};
export default Empty;
