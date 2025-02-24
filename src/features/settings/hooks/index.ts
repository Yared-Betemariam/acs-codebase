import { useCurrentUser } from "@/features/auth/hooks";
import { profileSchema } from "@/schemas";
import { useSession } from "next-auth/react";
import { z } from "zod";

export const useUserAccountCompletion = () => {
  const { user, isLoading } = useCurrentUser();

  if (isLoading) return undefined;

  if (user === null) return { percent: 0 };

  const { paymentInfoId } = user;
  return { percent: paymentInfoId ? 100 : 50 };
};

export const useSessionUpdate = () => {
  const { data: session, update } = useSession();

  const updateUser = (values: z.infer<typeof profileSchema>) => {
    if (values.username || values.imageUrl) {
      update({
        ...session,
        user: {
          ...session?.user,
          ...(values.username && { username: values.username }),
          ...(values.imageUrl && { image: values.imageUrl }),
        },
      });
    }
  };

  return {
    updateUser,
  };
};
