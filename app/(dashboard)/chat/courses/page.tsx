"use client";
import Link from "next/link";

import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, MessageSquareShare } from "lucide-react";

import Loader from "@/components/loader";
import { getAllUserCourses } from "@/modules/courses/server/courses";
import { MobileSidebarToggleButton } from "@/components/mobile-sidebar-toggle-button";
import ErrorPage from "@/components/error";
const CoursesPage = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["get-all-user-courses"],
    queryFn: () => getAllUserCourses(),
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

  if (!data?.courses) {
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
        <Button variant={"secondary"} size={"sm"}>
          <ArrowLeft />
          Back to Dashboard
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-10 max-w-5xl ">
        {data.courses.map((course) => (
          <Card key={course.id}>
            <CardContent className="flex justify-between">
              <h2>{course.title}</h2>
              <Badge
                appearance={"outline"}
                variant={"success"}
                size={"lg"}
                className="cursor-pointer"
                asChild
              >
                <Link href={`/chat/courses/${course.id}`}>
                  <MessageSquareShare />
                </Link>
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CoursesPage;
