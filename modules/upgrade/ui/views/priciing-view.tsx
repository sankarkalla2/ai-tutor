"use client";
import { useQuery } from "@tanstack/react-query";

import Loader from "@/components/loader";
import PricingCard from "../components/pricing-card";
import { usePricingPlan } from "../../hooks/use-upgrade";
import { getAllPlans, getUserActiveSubscription } from "@/server/user";

export default function PricingView() {
  const { data: allPlans, isLoading: isGetPlansLoading } = useQuery({
    queryKey: ["get-all-plans"],
    queryFn: () => getAllPlans(),
  });
  const { data: userSubscription, isLoading: isGetSubscriptionLoading } =
    useQuery({
      queryKey: ["get-user-subscription"],
      queryFn: () => getUserActiveSubscription(),
    });

  if (isGetPlansLoading || isGetSubscriptionLoading) {
    return <Loader />;
  }

  return (
    <section className="py-16">
      <div className="mx-auto w-full max-w-2xl px-6 lg:max-w-7xl">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-3xl/tight font-semibold tracking-tight sm:text-4xl/tight">
            Choose your plan
          </h2>
          <p className="text-muted-foreground mt-4 text-base/7 sm:text-lg/8">
            Aliquet adipiscing lectus praesent cras sed quis lectus egestas.
          </p>
        </div>

        <div className="mx-auto mt-12 grid gap-8 lg:max-w-4xl lg:grid-cols-2">
          {allPlans &&
            allPlans.map((plan) => {
              const { checkout, checkoutLabel } = usePricingPlan(
                plan,
                userSubscription
              );
              return (
                <PricingCard
                  key={plan.id}
                  checkout={checkout}
                  checkoutLabel={checkoutLabel}
                  plan={plan}
                />
              );
            })}
        </div>
      </div>
    </section>
  );
}
