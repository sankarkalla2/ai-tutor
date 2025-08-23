"use client";


import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

import GetUserCourses from "@/components/courses/get-user-courses";

const CoursesView = () => {
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
