"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

const Loading = () => {
  return (
    <div className="min-h-screen mx-auto p-4 md:px-8 space-y-8">
      {/* Header Section */}
      <div className="max-w-2xl mx-auto pt-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Skeleton className="h-6 w-24 rounded" /> {/* Badge */}
            <Skeleton className="h-8 w-32 rounded ml-4" />{" "}
            {/* Upgrade Button */}
          </div>
          <Skeleton className="h-10 w-80 mx-auto" /> {/* Title */}
          <Skeleton className="h-4 w-64 mx-auto mt-2" /> {/* Subtitle */}
        </div>

        {/* Card with Form */}
        <Card className="mb-6">
          <CardContent className="p-6 space-y-6">
            <div className="space-y-2">
              <Skeleton className="h-4 w-40" /> {/* Label */}
              <Skeleton className="h-24 w-full rounded" /> {/* Textarea */}
            </div>
            {/* Removed commented-out format selection skeleton */}
            <div className="flex items-center gap-3">
              <Skeleton className="h-5 w-5 rounded" /> {/* Checkbox */}
              <Skeleton className="h-4 w-64" /> {/* Label */}
            </div>
            <Skeleton className="h-10 w-full rounded" /> {/* Continue Button */}
          </CardContent>
        </Card>
      </div>

      {/* Your Courses Section */}
      <div className="max-w-7xl mx-auto">
        <Skeleton className="h-9 w-48 mb-4" /> {/* Section Title */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array(3)
            .fill(0)
            .map((_, index) => (
              <Card key={index}>
                <CardContent className="p-4 space-y-2">
                  <Skeleton className="h-6 w-3/4" /> {/* Course Title */}
                  <Skeleton className="h-8 w-full" /> {/* Description */}
                  <Skeleton className="h-6 w-24 rounded" />{" "}
                  {/* Badge or Button */}
                  <Skeleton className="h-10 w-full rounded" />

                </CardContent>
              </Card>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Loading;
