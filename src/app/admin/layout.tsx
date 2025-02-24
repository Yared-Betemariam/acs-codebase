import { auth } from "@/auth";
import Error from "@/components/ui/error";
import { Separator } from "@/components/ui/separator";
import { redirect } from "next/navigation";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  if (!session) return <Error text="No logged in" />;

  if (session.user.email !== process.env.ADMIN_USER_EMAIL) redirect("/");

  return (
    <main className="px-6 flex flex-col gap-2">
      <h1 className="h1 pb-2 pt-6">
        Welcome to the Admin page, {session.user.username}
      </h1>
      <Separator />
      {children}
    </main>
  );
};

export default layout;
