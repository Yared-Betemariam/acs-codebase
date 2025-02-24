"use client";

import { useEffect, useState } from "react";
import ConfirmationDialog from "./confirmation-dialog";
import OrderDialog from "./order-dialog";

const Modals = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <ConfirmationDialog />
      <OrderDialog />
    </>
  );
};
export default Modals;
