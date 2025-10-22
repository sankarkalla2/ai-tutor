"use client";

import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import {
  ArrowLeft,
  MessageSquareShareIcon,
} from "lucide-react";

import Loader from "@/components/loader";
import { getAllUserCourses } from "@/modules/courses/server/courses";
import { MobileSidebarToggleButton } from "@/components/mobile-sidebar-toggle-button";
import ErrorPage from "@/components/error";
import { useCoursesParams } from "@/hooks/use-courses-params";

const CoursesPage = () => {
  const [params] = useCoursesParams();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["get-all-user-courses", params],
    queryFn: () => getAllUserCourses(params),
  });

  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <ErrorPage errorMessage="Failed to fetch courses!. Please try again." />
      </div>
    );
  }

  if (!data?.items) {
    return (
      <p className="text-center text-sm text-muted-foreground h-full pt-[40vh]">
        No courses found
      </p>
    );
  }

  return (
    <div className="mx-auto max-w-5xl p-4">
      <div>
        <MobileSidebarToggleButton />
        <Button variant={"primary"} size={"sm"}>
          <ArrowLeft />
          Back to Dashboard
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-5 max-w-5xl gap-4">
        {data.items?.courses.map((course) => {
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

          const totalModules = course.modules.length;

          const progressPercentage = Math.round((completedLessons / totalLessons) * 100);
          return (
            <Item variant="outline" asChild key={course.id}>
              <a
                href={`/chat/courses/${course.id}`}
                
              >
                <ItemContent>
                  <ItemTitle>{course.title}</ItemTitle>
                  <ItemDescription>{course.description}</ItemDescription>

                  <div className="flex items-center gap-x-2">
                    <Badge size={"xs"} variant={"info"} appearance={"outline"}>
                      {totalModules} modules
                    </Badge>
                    <Badge
                      size={"xs"}
                      variant={"primary"}
                      appearance={"outline"}
                    >
                      {totalLessons} lessons
                    </Badge>
                    <Badge
                      variant={progressPercentage >= 50 ? "success" : "warning"}
                      className="truncate"
                      size="sm"
                      appearance={"outline"}
                    >
                      {progressPercentage}% completed
                    </Badge>
                  </div>
                </ItemContent>
                <ItemActions>
                  <MessageSquareShareIcon className="size-4" />
                </ItemActions>
              </a>
            </Item>
          );
        })}
      </div>
    </div>
  );
};

export default CoursesPage;
