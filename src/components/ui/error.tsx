import { cn } from "@/lib/utils";
import { FaExclamationTriangle } from "react-icons/fa";

interface Props {
  text?: string;
  center?: boolean;
}

const Error = ({ text, center }: Props) => {
  return (
    <div
      className={cn(
        "text-destructive flex items-center",
        center ? "flex-col justify-center mx-auto my-auto gap-2" : "gap-3"
      )}
    >
      <FaExclamationTriangle className="size-4" />
      <span className="text-sm">{text || "Something went wrong!"}</span>
    </div>
  );
};
export default Error;
