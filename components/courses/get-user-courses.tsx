"use client";

import { getAllUserCourses } from "@/modules/courses/server/courses";
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { BookOpen, Clock, ExternalLink, MessageCircle } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import Link from "next/link";
import { Skeleton } from "../ui/skeleton";

const GetUserCourses = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["get-all-user-courses"],
    queryFn: () => getAllUserCourses(),
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3, 4].map((key) => (
          <Skeleton className="w-full h-52 p-4" key={key} />
        ))}
      </div>
    );
  }

  if (data?.courses?.length === 0)
    return <h1 className="text-center text-2xl font-bold">No courses found</h1>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
      {data &&
        data.courses?.map((course) => {
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

          const progress = Math.round((completedLessons / totalLessons) * 100);

          return (
            <Card
              className="border hover:shadow-md transition-shadow duration-200 cursor-pointer"
              key={course.id}
              variant={"accent"}
            >
              <CardContent className="">
                <CardHeader className="p-0 mb-4">
                  <CardTitle className="text-lg font-medium mb-2">
                    {course.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground text-sm line-clamp-2">
                    {course.description}
                  </CardDescription>
                </CardHeader>

                <div className="flex items-center justify-around text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    <span>{course._count.modules} modules</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>
                      {course.modules.reduce(
                        (acc, module) => acc + module.lessons.length,
                        0
                      )}{" "}
                      lessons
                    </span>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {progress}% complete
                  </Badge>
                </div>

                {/* <div className="flex items-center justify-between mb-4">
                  <Badge variant="outline" className="text-xs">
                    {progress}% complete
                  </Badge>
                  <div className="w-20 bg-gray-100 rounded-full h-1">
                    <div 
                      className="bg-blue-600 h-1 rounded-full"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div> */}

                <div className="flex gap-2">
                  <Button asChild size="sm" className="flex-1" variant={"mono"}>
                    <Link href={`/course/${course.id}`}>
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Course
                    </Link>
                  </Button>

                  <Button size="sm" variant="outline">
                    <MessageCircle className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
    </div>
  );
};

export default GetUserCourses;
