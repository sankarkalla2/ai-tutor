import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Benefit } from "@polar-sh/sdk/models/components/benefit.js";
import { Product } from "@polar-sh/sdk/models/components/product.js";

interface PricingCardProps {
  plan: Product;
  checkout: () => void;
  checkoutLabel: string;
}
const PricingCard = ({ plan, checkout, checkoutLabel }: PricingCardProps) => {
  return (
    <Card className="" variant={"accent"}>
      <CardHeader>
        <CardTitle className="text-lg">{plan.name}</CardTitle>
        <CardDescription>{plan.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <div>
          <span className="text-4xl font-bold sm:text-5xl">${10}</span>
          <span className="text-muted-foreground ml-1">
            / {plan.prices[0].recurringInterval}
          </span>
        </div>
        <ul className="mt-6 space-y-4 text-sm">
          {plan.benefits.map((feature, i) => (
            <li key={i} className="text-muted-foreground flex items-center">
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
        <Button size="lg" className="w-full" onClick={() => checkout()}>
          {checkoutLabel}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PricingCard;
