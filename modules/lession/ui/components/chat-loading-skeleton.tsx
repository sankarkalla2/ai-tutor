"use client";

import { Skeleton } from "@/components/ui/skeleton";

const LessonChatLoadingSkeleton = () => {
  return (
    <div className="h-[100vh-30px] p-4 space-y-4 w-full flex flex-col justify-between">
      <Skeleton className="h-6 w-full" /> {/* Chat header */}
      <div className="space-y-2">
        {Array(5)
          .fill(0)
          .map((_, index) => (
            <div key={index} className="flex items-start gap-2 w-full">
              <Skeleton className="h-8 w-8" /> {/* Avatar */}
              <div className="space-y-2 w-full">
                <Skeleton className="h-4 w-24" /> {/* User name/time */}
                <Skeleton className="h-4 w-full" /> {/* Message text */}
              </div>
            </div>
          ))}
        <Skeleton className="h-10 w-full rounded mt-auto" /> {/* Chat input */}
      </div>
    </div>
  );
};

export default LessonChatLoadingSkeleton;
