"use client";

import Loader from "@/components/loader";
import { MobileSidebarToggleButton } from "@/components/mobile-sidebar-toggle-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllUserCourses } from "@/modules/courses/server/courses";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, ExternalLink, MessageSquareShare } from "lucide-react";
import Link from "next/link";

const CoursesPage = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["get-all-user-courses"],
    queryFn: () => getAllUserCourses(),
  });

  if (isLoading) {
    return <Loader />;
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
          <Card key={course.id} variant={"accent"}>
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
