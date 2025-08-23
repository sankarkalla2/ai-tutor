"use client";

import { MobileSidebarToggleButton } from "@/components/mobile-sidebar-toggle-button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const CourseViewIdLoading = () => {
  return (
    <div className="sm:w-full md:w-3xl lg:w-4xl mx-auto px-4 space-y-6">
      <MobileSidebarToggleButton />
      <div className="space-y-6">
        <div className="space-x-2">
          <div className="flex items-center justify-between space-y-1">
            <Skeleton className="h-8 w-[400px]" /> {/* Course title */}
            <Skeleton className="h-6 w-24 rounded" /> {/* Progress badge */}
          </div>
          <div className="flex items-center gap-6">
            <Skeleton className="h-5 w-20" /> {/* Modules */}
            <Skeleton className="h-5 w-20" /> {/* Lessons */}
            <Skeleton className="h-5 w-20" /> {/* Completed */}
          </div>
        </div>
        <Card>
          <CardContent className="space-y-4 pt-6">
            {Array(4)
              .fill(0)
              .map((_, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-6 w-64" /> {/* Module title */}
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-6 w-28 rounded hidden md:flex" />{" "}
                      {/* Completed badge */}
                      <Skeleton className="h-6 w-16 rounded" />{" "}
                      {/* Progress badge */}
                    </div>
                  </div>
                  {Array(4)
                    .fill(0)
                    .map((_, lessonIndex) => (
                      <div
                        key={lessonIndex}
                        className="flex items-center gap-2"
                      >
                        <Skeleton className="h-4 w-4" /> {/* Status icon */}
                        <Skeleton className="h-4 w-2/3" /> {/* Lesson title */}
                        <Skeleton className="h-6 w-20 ml-auto rounded" />{" "}
                        {/* Start badge */}
                      </div>
                    ))}
                </div>
              ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
