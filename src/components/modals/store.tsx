import { Account } from "@/mongoose/models/account";
import { create } from "zustand";

interface ConfirmationDialogState {
  isOpen: boolean;
  title: string;
  description: string;
  type: "error" | "default";
  status: "success" | "error" | "loading" | undefined;
  setStatus: (status: "success" | "error" | "loading" | undefined) => void;
  onClick: () => void;
  openDialog: (
    title: string,
    description: string,
    onClick: () => void,
    type?: "error" | "default"
  ) => void;
  closeDialog: () => void;
}

export const useConfirmationDialogStore = create<ConfirmationDialogState>(
  (set) => ({
    isOpen: false,
    title: "",
    description: "",
    onClick: () => {},
    status: undefined,
    type: "default",
    setStatus: (status) => set({ status }),
    openDialog: (title, description, onClick, type) =>
      set({ isOpen: true, title, description, onClick, type }),
    closeDialog: () =>
      set({
        isOpen: false,
        title: "",
        description: "",
        type: "default",
        status: undefined,
        onClick: () => {},
      }),
  })
);

interface OrderDialogState {
  isOpen: boolean;
  account: Account | undefined;
  openDialog: (account: Account) => void;
  closeDialog: () => void;
}

export const useOrderDialogStore = create<OrderDialogState>((set) => ({
  isOpen: false,
  account: undefined,
  openDialog: (account) => set({ account, isOpen: true }),
  closeDialog: () =>
    set({
      isOpen: false,
      account: undefined,
    }),
}));
