import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { magicLink } from "better-auth/plugins";
import { passkey } from "better-auth/plugins/passkey";
import { db } from "./db";
import {
  polar,
  checkout,
  portal,
  usage,
  webhooks,
} from "@polar-sh/better-auth";
import { polarClient } from "./polar";
import { Resend } from "resend";
import { toast } from "sonner";

const resend = new Resend(process.env.RESEND_API_KEY);
export const auth = betterAuth({
  database: prismaAdapter(db, {
    provider: "postgresql", // or "mysql", "postgresql", ...etc
  }),

  socialProviders: {
    twitter: {
      clientId: process.env.TWITTER_CLIENT_ID!,
      clientSecret: process.env.TWITTER_CLIENT_SECRET!,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  plugins: [
    magicLink({
      async sendMagicLink(data) {
        // Send an email to the user with a magic link
        console.log(data);
        const { data: mailData, error } = await resend.emails.send({
          from: "Acme <onboarding@resend.dev>",
          to: ["gowrisankarkalla4@gmail.com"],
          subject: "Hello World",
          html: `<a href=${data.url}>click to login </a>`,
        });

        if (error) {
          console.log(error.message);
          toast.error("something went wrong");
        }
      },
    }),
    passkey(),
    polar({
      client: polarClient,
      createCustomerOnSignUp: true,
      use: [
        checkout({
          products: [
            {
              productId: "bcf1c6bd-6cba-4a13-92fa-7b6458d008f2",
              slug: "Monthly", // Custom slug for easy reference in Checkout URL, e.g. /checkout/Monthly
            },
          ],
          successUrl: process.env.POLAR_SUCCESS_URL,
          authenticatedUsersOnly: true,
        }),
        portal(),
      ],
    }),
  ],
});
