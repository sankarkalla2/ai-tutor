import { authClient } from "@/lib/auth-client";
import { polarClient } from "@/lib/polar";
import { CustomerStateSubscription } from "@polar-sh/sdk/models/components/customerstatesubscription.js";
import { Product } from "@polar-sh/sdk/models/components/product.js";

export const usePricingPlan = (
  plan: Product,
  userSubscription: CustomerStateSubscription | null | undefined
) => {
  let checkoutLabel = userSubscription ? "Upgrade" : "Get started";
  let checkout: () => void = () => {};
  checkout = () => authClient.checkout({ products: [plan.id] });
  const isPlanActive = userSubscription
    ? userSubscription.productId === plan.id
    : false;

  if (isPlanActive) {
    checkoutLabel = "Manage subscription";
    const updatedPlan = async () => {
      // Get the customer ID from your Better Auth state
      console.log("called");
      const customerState = await authClient.customer.state();
      const customerId = customerState.data?.id ?? "";

      // Create a customer session
      const sessionResult = await polarClient.customerSessions.create({
        customerId: customerId,
      });

      const customerSessionToken = sessionResult.token;

      const res = await polarClient.customerPortal.subscriptions.update(
        {
          customerSession: customerSessionToken,
        },
        {
          id: userSubscription?.id ?? "",
          customerSubscriptionUpdate: { productId: plan.id },
        }
      );
    };
    checkout = () => authClient.customer.portal();

    if (plan.id !== userSubscription?.productId) {
      //Todo: code for updated plan
      console.log("it already here");
      checkout = updatedPlan;
    }
  }

  return {
    checkoutLabel,
    checkout,
  };
};
