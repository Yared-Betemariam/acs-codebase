import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface Props {
  text?: string;
  center?: boolean;
}

const Loading = ({ text, center }: Props) => {
  return (
    <div
      className={cn(
        "flex items-center opacity-50",
        center ? "flex-col justify-center mx-auto my-auto gap-2" : "gap-3"
      )}
    >
      <Loader2 className="size-4 animate-spin" />
      <span className="text-sm">{text || "Loading..."}</span>
    </div>
  );
};
export default Loading;
