import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

import GetUserCourses from "@/components/courses/get-user-courses";
import { MobileSidebarToggleButton } from "@/components/mobile-sidebar-toggle-button";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getAllUserCourses } from "../server/courses";
import type { SearchParams } from "nuqs/server";
import { coursesParamsLoader } from "@/server/courses-params-loader";
import { CoursePagination } from "../components/course-pagination";

type Props = {
  searchParams: Promise<SearchParams>;
};

const CoursesView = async ({ searchParams }: Props) => {
  const params = await coursesParamsLoader(searchParams);
  const queryClient = new QueryClient();
  void queryClient.prefetchQuery({
    queryKey: ["get-all-user-courses", params],
    queryFn: async () => await getAllUserCourses(params),
  });
  return (
    <div className="min-h-screen py-8">
      <div className=" px-4">
        <MobileSidebarToggleButton />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col min-h-[calc(100vh-4rem)]">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold leading-relaxed">
              Your Learnings
            </h1>
            <p className="text-gray-600 text-sm">
              Continue your learning journey and track your progress
            </p>
          </div>
          <Button variant={"secondary"} asChild>
            <Link href={"/new"}>
              <Plus />
              <span className="">Create New</span>
            </Link>
          </Button>
        </div>

        <HydrationBoundary state={dehydrate(queryClient)}>
          <div className="flex-1 space-y-2">
            <GetUserCourses />
          </div>
          <div className="pb-8">
            <CoursePagination />
          </div>
        </HydrationBoundary>
      </div>
    </div>
  );
};

export default CoursesView;
