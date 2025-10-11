"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
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

export const updateUserProfile = async (name?: string, imgUrl?: string) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    return { status: 401, message: "Access Denied" };
  }

  try {
    await auth.api.updateUser({
      body: {
        ...(name && { name }),
        ...(name && { image: imgUrl }),
      },
    });

    return { status: 200, message: "You profile Updated" };
  } catch (error) {
    console.log(error);
    return { status: 500, message: "Something went wrong. please try again." };
  }
};

export const storeFeedback = async (feedback: string, email?: string) => {
  try {
    await db.feedback.create({
      data: {
        email: email,
        feedback: feedback,
      },
    });

    return { status: 200, message: "Thank you" };
  } catch (error) {
    return { status: 500, message: "Intervel server error" };
  }
};
