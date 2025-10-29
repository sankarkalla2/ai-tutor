import { SignInView } from "@/modules/sign-in/ui/views/sign-in-view";
import { redirectAuthrizedUser } from "@/server/user";

export default async function SignIn() {
  await redirectAuthrizedUser();

  return <SignInView />;
}
