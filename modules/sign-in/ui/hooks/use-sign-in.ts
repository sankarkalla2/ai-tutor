import { useState } from "react";

import { authClient, signIn } from "@/lib/auth-client";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
const useSignIn = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirectUrl") || "/dashboard";

  const signInWithMagicLink = async () => {
    if (!email) toast.error("Please enter your email address");

    const data = await signIn.magicLink(
      {
        email,
        callbackURL: redirectUrl,
        newUserCallbackURL: "/new",
      },
      {
        onRequest: (ctx) => {
          setLoading(true);
        },
        onResponse: (ctx) => {
          setLoading(false);
        },
      }
    );
    if (data.data) toast.success("Email sent successfully");
    if (data.error) toast.error("Something went wrong. please try again");
  };

  const signInWithSocials = async (provider: "google" | "github") => {
    await signIn.social(
      {
        provider,
        callbackURL: redirectUrl,
        newUserCallbackURL: "/new",
      },
      {
        onRequest: (ctx) => {
          setLoading(true);
        },
        onResponse: (ctx) => {
          setLoading(false);
        },
      }
    );
  };

  const signInWithPasskey = async () => {
    await authClient.signIn.passkey({});
  };

  return {
    email,
    setEmail,
    loading,
    setLoading,
    signInWithMagicLink,
    signInWithSocials,
    signInWithPasskey,
  };
};

export default useSignIn;
