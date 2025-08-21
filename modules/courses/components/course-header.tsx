"use client";

import { useParams } from "next/navigation";
import { useCourseViewId } from "../hooks/use-course-view-id";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Home, MessageCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface CourseHeaderProps {
  courseId: string;
}
const CourseHeader = ({ courseId }: CourseHeaderProps) => {
  const {
    data,
    isLoading,
    isError,
    totalLessons,
    completedLessons,
    progressPercentage,
  } = useCourseViewId(courseId);

  if (!data?.course) return null;
  return (
    <header className="flex w-full h-14 shrink-0 items-center gap-2 border-b px-4 justify-between">
      <div className="flex w-full items-center gap-2 justify-between">
        <div className="">
          <Breadcrumb>
            <BreadcrumbList className="">
              <BreadcrumbItem>
                <BreadcrumbLink href="/" className="flex items-center gap-1">
                  <Home className="h-4 w-4" />
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/courses">Courses</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href={`/courses/${data.course.id}`}>
                  {data.course.title}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="flex items-center gap-x-2 text-muted-foreground">
            <Badge size={"xs"} variant={'info'}>{data?.course.modules.length} Modules</Badge>
            <Badge size={"xs"}>{totalLessons} Lessons</Badge>
            <Badge size={"xs"}>{completedLessons} Lessons Completed</Badge>
          </div>
        </div>
      </div>
    </header>
  );
};

export default CourseHeader;
