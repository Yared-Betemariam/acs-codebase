import { useCurrentUser } from "@/features/auth/hooks";

export const useUserAccountCompletion = () => {
  const { user } = useCurrentUser();
  if (user === null) return { percent: 0 };
  const { paymentInfoId } = user;
  return { percent: paymentInfoId ? 100 : 50 };
};
