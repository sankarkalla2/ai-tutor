import { createAuthClient } from "better-auth/react";
import { magicLinkClient, passkeyClient } from "better-auth/client/plugins";


export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL,
  plugins: [magicLinkClient(), passkeyClient()],
});

export const { signIn, signOut, signUp, useSession } = authClient;
