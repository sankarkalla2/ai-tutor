"use client";
import { CourseSidebar } from "@/modules/courses/components/course-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import React, { useState } from "react";

import { Home, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCourseViewId } from "@/modules/courses/hooks/use-course-view-id";
import { useParams } from "next/navigation";
import { Header } from "@/modules/lession/ui/components/lesson-header";

const CourseLayout = ({ children }: { children: React.ReactNode }) => {
  const { id } = useParams<{ id: string }>();
  const {
    data,
    isLoading,
    isError,
    totalLessons,
    completedLessons,
    progressPercentage,
  } = useCourseViewId(id);

  if (!data?.course) return null;
  return (
    <>
      <SidebarProvider>
        <CourseSidebar />
        <SidebarInset>{children}</SidebarInset>
      </SidebarProvider>
    </>
  );
};

export default CourseLayout;
