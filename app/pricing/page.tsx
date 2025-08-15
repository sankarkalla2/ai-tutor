"use client";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { authClient } from "@/lib/auth-client";
import PricingView from "@/modules/upgrade/ui/views/priciing-view";

const PricingPage = () => {
  return <PricingView />;
};

export default PricingPage;
