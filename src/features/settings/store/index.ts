import { PaymentInfo } from "@/mongoose/models/payment-info";
import { create } from "zustand";

interface paymentInfoStore {
  paymentInfo: PaymentInfo | undefined | null;
  // setPaymentInfo: (paymentInfo: PaymentInfo) => void;
  loadPaymentInfo: (id: string) => void;
}

export const usePaymentInfoStore = create<paymentInfoStore>((set) => ({
  paymentInfo: undefined,
  // setPaymentInfo: (paymentInfo) => set({ paymentInfo }),
  loadPaymentInfo: async (id) => {
    try {
      set({ paymentInfo: undefined });
      const paymentInfo = await fetch(`/api/payments/${id}`).then((res) =>
        res.json()
      );
      set({ paymentInfo: paymentInfo as PaymentInfo | null });
    } catch {
      set({ paymentInfo: null });
    }
  },
}));
