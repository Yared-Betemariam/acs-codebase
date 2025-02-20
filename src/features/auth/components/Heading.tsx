import { cn } from "@/lib/utils";

const Heading = ({ label, center }: { label?: string; center?: boolean }) => {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        center && "justify-center items-center text-center"
      )}
    >
      <span className="text-4xl opacity-75 font-semibold tracking-tighter">
        {label}
      </span>
    </div>
  );
};

export default Heading;
