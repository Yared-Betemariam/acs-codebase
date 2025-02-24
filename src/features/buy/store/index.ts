import { Account } from "@/mongoose/models/account";
import { create } from "zustand";

interface AccountsStore {
  accounts: Account[] | undefined | null;
  // setAccounts: (accounts: Account[]) => void;
  loadAccounts: () => void;
}

export const useAccountsStore = create<AccountsStore>((set) => ({
  accounts: undefined,
  // setAccounts: (accounts) => set({ accounts }),
  loadAccounts: async () => {
    try {
      set({ accounts: undefined });
      const Account = await fetch(`/api/accounts`).then((res) => res.json());
      set({ accounts: Account as Account[] });
    } catch {
      set({ accounts: null });
    }
  },
}));
