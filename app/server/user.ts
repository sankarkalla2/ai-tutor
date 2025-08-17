"use server";

import { auth} from "@/lib/auth";
import { polarClient } from "@/lib/polar";
import { headers } from "next/headers";

export const getAllPlans = async () => {
  const products = await polarClient.products.list({
    isArchived: false,
    isRecurring: true,
    sorting: ["price_amount"],
  });

  return products.result.items;
};

export const getUserActiveSubscription = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) return null;

  const customer = await polarClient.customers.getStateExternal({
    externalId: session.user.id,
  });

  const subscription = customer.activeSubscriptions[0];
  return subscription ?? null;
};
