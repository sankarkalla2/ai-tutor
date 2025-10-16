"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Key, Loader2, MoveLeft } from "lucide-react";

import { cn } from "@/lib/utils";
import useSignIn from "../hooks/use-sign-in";

export const SignInView = () => {
  const {
    signInWithMagicLink,
    signInWithSocials,
    signInWithPasskey,
    email,
    setEmail,
    loading,
  } = useSignIn();

  return (
    <div className="max-h-screen w-full pt-32">
      <div className="max-w-sm mx-auto space-y-2">
        <Button asChild size={"sm"} variant={"outline"}>
          <Link href={"/"}>
            <MoveLeft className="h-4 w-4" />
            Home
          </Link>
        </Button>
        <Card className="">
          <CardContent className="space-y-3">
            <div className="flex flex-col justify-center items-center">
              <CardTitle className="text-2xl">Sign In</CardTitle>
              <CardDescription>
                Welcome back! Please sign in to your account.
              </CardDescription>
            </div>
            <FieldGroup>
              <Field>
                <Button
                  variant="outline"
                  className={cn("w-full gap-2 mt-2")}
                  disabled={loading}
                  onClick={() => signInWithSocials("google")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="0.98em"
                    height="1em"
                    viewBox="0 0 256 262"
                  >
                    ,
                    <path
                      fill="#4285F4"
                      d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                    ></path>
                    <path
                      fill="#34A853"
                      d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                    ></path>
                    <path
                      fill="#FBBC05"
                      d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"
                    ></path>
                    <path
                      fill="#EB4335"
                      d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                    ></path>
                  </svg>
                  Sign in with Google
                </Button>
                <Button
                  variant="secondary"
                  disabled={loading}
                  className="gap-2 w-full"
                  onClick={signInWithPasskey}
                >
                  <Key size={16} />
                  Sign-in with Passkey
                </Button>
              </Field>
            </FieldGroup>
            <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card mt-2">
              Or continue with
            </FieldSeparator>

            <div className="grid gap-1 mt-4">
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  value={email}
                />
              </Field>
              <Button
                disabled={loading}
                className="gap-2"
                onClick={signInWithMagicLink}
              >
                {loading ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <> Sign-in with Magic Link</>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
        <FieldDescription className="px-6 text-center">
          By clicking continue, you agree to our{" "}
          <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
        </FieldDescription>
      </div>
    </div>
  );
};
