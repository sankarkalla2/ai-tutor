"use client";
import { Button } from "@/components/ui/button";
import { useCoursesParams } from "@/hooks/use-courses-params";
import { useQuery } from "@tanstack/react-query";
import { getAllUserCourses } from "../server/courses";
import { ArrowLeft, ArrowRight } from "lucide-react";

export const CoursePagination = () => {
  const [params, setParams] = useCoursesParams();
  const { data, isLoading } = useQuery({
    queryKey: ["get-user-courses-by-params", params],
    queryFn: () => getAllUserCourses(params),
  });

  const hasPrevPage = data?.items?.hasPrevPage ?? false;
  const hasNextPage = data?.items?.hasNextPage ?? false;

  return (
    <div className="w-full flex items-center justify-between my-auto">
      <Button
        disabled={isLoading || !hasPrevPage}
        size={"sm"}
        onClick={() => {
          setParams({
            ...params,
            page: params.page - 1,
          });
        }}
        variant={"outline"}
      >
        <ArrowLeft />
        Prev
      </Button>
      <Button
        disabled={isLoading || !hasNextPage}
        onClick={() => {
          setParams({ ...params, page: params.page + 1 });
        }}
        size={"sm"}
        variant="outline"
      >
        <ArrowRight />
        Next
      </Button>
    </div>
  );
};
