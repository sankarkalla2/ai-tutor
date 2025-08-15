import { auth } from "@/lib/auth";
import { SignInView } from "@/modules/sign-in/ui/views/sign-in-view";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function SignIn() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session?.user) return redirect("/new");
  return <SignInView />;
}
