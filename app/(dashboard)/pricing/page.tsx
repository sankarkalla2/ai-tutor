import PricingView from "@/modules/upgrade/ui/views/priciing-view";
import { getAllPlans, getUserActiveSubscription } from "@/server/user";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

const PricingPage = () => {
  const queryClient = new QueryClient();
  void queryClient.prefetchQuery({
    queryKey: ["get-all-plans"],
    queryFn: async() => await getAllPlans(),
  });

  void queryClient.prefetchQuery({
    queryKey: ['get-user-subscription'],
    queryFn: async() => await getUserActiveSubscription()
  })



  return <HydrationBoundary state={dehydrate(queryClient)}>
    <PricingView />;
  </HydrationBoundary>
};

export default PricingPage;
