"use client";

import { useProductId } from "@/features/buy/hooks";

const Page = () => {
  const { id } = useProductId();
  return <div>{id}</div>;
};

export default Page;
