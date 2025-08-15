import { useState } from "react";

import { authClient, signIn } from "@/lib/auth-client";
import { toast } from "sonner";
const useSignIn = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const signInWithMagicLink = async () => {
    if (!email) toast.error("Please enter your email address");

    await signIn.magicLink(
      {
        email,
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

  const signInWithSocials = async (provider: "google" | "github") => {
    await signIn.social(
      {
        provider,
        callbackURL: "/new",
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
