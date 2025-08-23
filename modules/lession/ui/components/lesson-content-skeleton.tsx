"use client";

import { Skeleton } from "@/components/ui/skeleton";

export const LessonContentSkeleton = () => {
  return (
    <div className="h-full overflow-y-auto scrollbar-hide p-4 md:px-8 lg:px-20 mx-auto space-y-6 max-w-5xl">
      {/* Top Controls Skeleton */}
      <div className="flex justify-end items-center gap-2 lg:w-3xl">
        <Skeleton className="h-8 w-8 rounded" /> {/* Toggle Chat Button */}
        <Skeleton className="h-8 w-8 rounded" /> {/* Edit Dropdown */}
        <Skeleton className="h-6 w-32 rounded" /> {/* Mark Done Badge */}
      </div>

      {/* Lesson Content Skeleton */}
      <div className="space-y-4">
        <Skeleton className="h-6 w-3/4" /> {/* Heading */}
        <Skeleton className="h-4 w-full" />
        {/* Paragraph lines */}
        <Skeleton className="h-6 w-2/3" /> {/* Subheading */}
        <Skeleton className="h-4 w-full" /> {/* More text */}
        <Skeleton className="h-32 w-full rounded" /> {/* Code block or media */}
        <Skeleton className="h-4 w-5/6" /> {/* Additional text */}
      </div>

      {/* Quiz Section Skeleton */}
      <div className="space-y-4" >
        <Skeleton className="h-6 w-40" /> {/* Quiz title */}
        {Array(3)
          .fill(0)
          .map((_, index) => (
            <div key={index} className="space-y-2">
              <Skeleton className="h-5 w-3/4" /> {/* Question */}
              <Skeleton className="h-4 w-1/2" /> {/* Option 1 */}
              <Skeleton className="h-4 w-2/3" /> {/* Option 2 */}
              <Skeleton className="h-4 w-1/2" /> {/* Option 3 */}
              <Skeleton className="h-4 w-2/3" /> {/* Option 4 */}
            </div>
          ))}
      </div>

      {/* Navigation Buttons Skeleton */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-9 w-24 rounded" /> {/* Prev Button */}
        <Skeleton className="h-9 w-24 rounded" /> {/* Next Button */}
      </div>
    </div>
  );
};
