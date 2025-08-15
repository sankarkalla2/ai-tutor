"use client";

import { useQuery } from "@tanstack/react-query";
import { getAllUserCourses } from "../server/courses";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import {
  BookOpen,
  Clock,
  ExternalLink,
  Link2,
  Link2Icon,
  MessageCircle,
  Plus,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import GetUserCourses from "@/components/courses/get-user-courses";

const CoursesView = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["get-all-user-courses"],
    queryFn: () => getAllUserCourses(),
  });

  function getProgressBadgeVariant(progress: number) {
    if (progress >= 80) return "default"; // Green
    if (progress >= 50) return "secondary"; // Blue
    if (progress >= 20) return "outline"; // Yellow outline
    return "destructive"; // Red for not started
  }

  function getProgressText(progress: number) {
    if (progress >= 80) return "Almost Complete";
    if (progress >= 50) return "In Progress";
    if (progress >= 20) return "Getting Started";
    return "Not Started";
  }
  if (isLoading || isError) return <div>..loading</div>;

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold leading-relaxed">
              Your Learnings
            </h1>
            <p className="text-gray-600 text-sm">
              Continue your learning journey and track your progress
            </p>
          </div>
          <Button variant={"secondary"} asChild>
            <Link href={"/new"}>
              <Plus />
              Create New Course
            </Link>
          </Button>
        </div>

        <GetUserCourses />
      </div>
    </div>
  );
};

export default CoursesView;
