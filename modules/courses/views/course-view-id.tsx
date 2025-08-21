"use client";

import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Circle, CircleCheckBig, MoveRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Spinner from "@/components/spinner";
import CourseHeader from "../components/course-header";

import { useCourseViewId } from "../hooks/use-course-view-id";
import Link from "next/link";
import { MobileSidebarToggleButton } from "@/components/mobile-sidebar-toggle-button";
const CourseViewIdPage = () => {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const {
    data,
    isLoading,
    isError,
    totalLessons,
    completedLessons,
    progressPercentage,
  } = useCourseViewId(params.id);

  if (isLoading)
    return (
      <div className="absolute inset-0 bg-white/60 z-10 flex items-center justify-center rounded-lg">
        <Spinner />
      </div>
    );

  if (isError) return <div>...error</div>;

  if (!data?.course) {
    toast.error(data?.message);
    router.push("/courses");
  }

  return (
    <div>
      <div className="max-w-4xl mx-auto *:mt-6 px-4">
        {/* Course Header */}

        <MobileSidebarToggleButton />
        <div className="space-x-2">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">{data?.course?.title}</h1>
            <Badge variant="secondary" className="text-sm">
              {progressPercentage}% Complete
            </Badge>
          </div>

          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <span>{data?.course?.modules.length} modules</span>
            <span>{totalLessons} lessons</span>
            <span>{completedLessons} completed</span>
          </div>
        </div>

        {/* All Modules and Lessons */}
        <Card className="">
          {data?.course?.modules.map((module, moduleIndex) => {
            const moduleCompleted = module.lessons?.filter(
              (l) => l.status === "COMPLETED"
            ).length;
            const moduleTotal = module.lessons.length;
            const moduleProgress = Math.round(
              (moduleCompleted / moduleTotal) * 100
            );

            return (
              <CardContent key={module.id} className="">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl  font-semibold pb-2">
                    Module {moduleIndex + 1}: {module.title}
                  </h2>
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="hidden md:flex">
                      {moduleCompleted} / {moduleTotal} completed
                    </Badge>
                    <Badge variant="secondary" className="text-sm">
                      {moduleProgress}%
                    </Badge>
                  </div>
                </div>

                <div className="">
                  {module.lessons.map((lesson, lessonIndex) => (
                    <div key={lesson.id} className="">
                      <Link
                        className="flex items-center py-2 px-2 gap-x-2 rounded-md hover:bg-accent transition-colors cursor-pointer"
                        href={`/course/${params.id}/lesson/${lesson.id}`}
                      >
                        {lesson.status === "COMPLETED" ? (
                          <CircleCheckBig className="h-4 w-4 text-green-500 flex-shrink-0" />
                        ) : lesson.status === "GENERATED" ? (
                          <CircleCheckBig className="h-4 w-4 text-slate-300 flex-shrink-0" />
                        ) : (
                          <Circle className="h-4 w-4 text-slate-300 flex-shrink-0" />
                        )}
                        <div className="min-w-0">
                          <div className="text-sm truncate">
                            {moduleIndex + 1}.{lessonIndex + 1} {lesson.title}
                          </div>
                        </div>

                        <div className="ml-auto flex items-center gap-2">
                          <Badge variant={"primary"}>
                            <MoveRight /> Start
                          </Badge>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </CardContent>
            );
          })}
        </Card>
      </div>
    </div>
  );
};

export default CourseViewIdPage;
