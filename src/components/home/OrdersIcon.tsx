import Link from "next/link";
import { FiShoppingBag } from "react-icons/fi";

export default function OrdersIcon() {
  return (
    <Link
      href="/orders"
      className="relative hover:bg-accent/10 rounded-lg duration-300 transition-all inline-flex p-1.5"
    >
      <FiShoppingBag className="size-[18px] opacity-80" />
      <span className="sr-only">Orders</span>
      {/* <Badge
        variant="destructive"
        className="absolute -top-2 -right-2 h-4 w-4 flex items-center justify-center p-0 text-xs rounded-full"
      >
        3
      </Badge> */}
    </Link>
  );
}
