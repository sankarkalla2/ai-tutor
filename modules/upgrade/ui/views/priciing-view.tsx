import { getAllPlans, getUserActiveSubscription } from "@/app/server/user";
import Loader from "@/components/loader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";
import { useQuery } from "@tanstack/react-query";

interface Plan {
  id: string;
  title: string;
  description: string;
  price: number;
  features: string[];
  href: string;
}

const plans: Plan[] = [
  {
    id: "pro",
    title: "Professional",
    description: "Perfect for individual developers",
    price: 24,
    features: [
      "Lifetime access",
      "All current + future components",
      "Free updates",
      "Use in unlimited projects",
      "Email support",
    ],
    href: "#",
  },
  {
    id: "team",
    title: "Team",
    description: "Ideal for small teams",
    price: 129,
    features: [
      "Everything in Pro plan",
      "5 team members included",
      "Priority support",
      "Team management dashboard",
      "One invoice for all users",
    ],
    href: "#",
  },
];

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
  console.log(allPlans, userSubscription);
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
              let checkoutLabel = userSubscription ? "Upgrade" : "Get started";
              let checkout = () => authClient.checkout({ products: [plan.id] });
              const isPlanActive = userSubscription
                ? userSubscription.productId === plan.id
                : false;
              if (isPlanActive) {
                checkoutLabel = "Manage subscription";
                checkout = () => authClient.customer.portal()
              }
              return (
                <Card key={plan.id} className="sm:px-6 sm:!py-12">
                  <CardHeader>
                    <CardTitle className="text-lg">{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <div>
                      <span className="text-4xl font-bold sm:text-5xl">
                        ${10}
                      </span>
                      <span className="text-muted-foreground ml-1">
                        / {plan.prices[0].recurringInterval}
                      </span>
                    </div>
                    <ul className="mt-6 space-y-4 text-sm">
                      {plan.benefits.map((feature, i) => (
                        <li
                          key={i}
                          className="text-muted-foreground flex items-center"
                        >
                          <svg
                            className="mr-4 h-4 w-4 text-green-700"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          <span>{feature.description}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button
                      size="lg"
                      className="w-full"
                      onClick={() => checkout()}
                    >
                      {isPlanActive ? "Manange" : "Upgrade"}
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
        </div>
      </div>
    </section>
  );
}
