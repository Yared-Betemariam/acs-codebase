import { absoulteUrl } from "@/config";
import { User } from "@/mongoose/models/user";

export const getUserByEmailAPI = async (email: string) => {
  try {
    const res = await fetch(absoulteUrl(`/api/auth-user/user?email=${email}`), {
      method: "GET",
    });
    const data = await res.json();
    return data as User;
  } catch (error) {
    console.log(error);
    return null;
  }
};
