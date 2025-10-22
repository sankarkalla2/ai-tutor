"use client";

import { getAllUserCourses } from "@/modules/courses/server/courses";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "../ui/skeleton";
import { SearchInCourses } from "@/modules/courses/components/search-in-courses";
import { useCoursesParams } from "@/hooks/use-courses-params";
import { usePathname } from "next/navigation";
import CourseItem from "./course-item";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../ui/empty";
import { Button } from "../ui/button";
import { FileQuestionIcon, PlusIcon } from "lucide-react";
import Link from "next/link";

const GetUserCourses = () => {
  const [params] = useCoursesParams();
  const pathname = usePathname();
  const isCoursePage = pathname.includes("/courses");
  const { data, isLoading } = useQuery({
    queryKey: ["get-all-user-courses", params],
    queryFn: () => getAllUserCourses(params),
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3, 4].map((key) => (
          <Skeleton className="w-full h-40 p-4" key={key} />
        ))}
      </div>
    );
  }

  if (data?.items?.courses.length === 0)
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <FileQuestionIcon />
          </EmptyMedia>
          <EmptyTitle>No Courses Found</EmptyTitle>
          <EmptyDescription>
            No courses found. You can create a new one.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <div className="flex gap-2">

            <Button asChild>
              <Link href={'/new'} prefetch>
                <PlusIcon />
                Create New
              </Link>
            </Button>
          </div>
        </EmptyContent>
      </Empty>
    );

  return (
    <div className="space-y-4 w-full h-full">
      {isCoursePage && (
        <div className="max-w-sm">
          <SearchInCourses totalCourses={data?.items?.courses?.length || 0} />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
        {data &&
          data.items?.courses?.map((course) => {
            const completedLessons = course.modules.reduce((acc, module) => {
              acc += module.lessons?.filter(
                (lesson) => lesson.status === "COMPLETED"
              ).length;
              return acc;
            }, 0);

            const totalLessons = course.modules.reduce((acc, module) => {
              acc += module.lessons?.length;
              return acc;
            }, 0);

            const progress = Math.round(
              (completedLessons / totalLessons) * 100
            );

            const modules = course.modules.length;

            return (
              <CourseItem
                key={course.id}
                progress={progress}
                modules={modules}
                totalLessons={totalLessons}
                title={course.title}
                description={course.description}
                id={course.id}
              />
            );
          })}
      </div>
    </div>
  );
};

export default GetUserCourses;
