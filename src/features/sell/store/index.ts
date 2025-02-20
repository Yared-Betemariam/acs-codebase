import { Account } from "@/mongoose/models/account";
import { create } from "zustand";

interface UserAccountsStore {
  accounts: Account[] | undefined | null;
  setAccounts: (accounts: Account[]) => void;
  loadAccounts: () => void;
}

export const useUserAccountsStore = create<UserAccountsStore>((set) => ({
  accounts: undefined,
  setAccounts: (accounts) => set({ accounts }),
  loadAccounts: async () => {
    try {
      set({ accounts: undefined });
      const Account = await fetch(`/api/accounts/user`).then((res) =>
        res.json()
      );
      set({ accounts: Account as Account[] });
    } catch {
      set({ accounts: null });
    }
  },
}));
